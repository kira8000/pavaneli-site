import { beforeEach, describe, expect, it } from "vitest";
import { createMockBackend, type MockBackend } from "@/services/mock-backend";
import {
  SAMPLE_BODIES,
  requestLine,
  sendApiDemoRequest,
  type ApiDemoRequest,
} from "./api-demo";

function request(overrides: Partial<ApiDemoRequest>): ApiDemoRequest {
  return { resource: "users", method: "GET", id: "", body: "", ...overrides };
}

describe("api demo", () => {
  let backend: MockBackend;

  const send = (overrides: Partial<ApiDemoRequest>) =>
    sendApiDemoRequest(backend.services, request(overrides));

  beforeEach(() => {
    backend = createMockBackend({ latencyMs: 0 });
  });

  it("maps successful calls to HTTP statuses", async () => {
    expect((await send({ method: "GET" })).status).toBe(200);
    expect((await send({ method: "GET", id: "usr_001" })).status).toBe(200);

    const created = await send({ method: "POST", body: SAMPLE_BODIES.users.POST });
    expect(created.status).toBe(201);

    const { id } = created.body as { id: string };
    expect(
      (await send({ method: "PATCH", id, body: '{"status":"active"}' })).status,
    ).toBe(200);
    expect(await send({ method: "DELETE", id })).toMatchObject({
      status: 204,
      body: null,
    });
    expect((await send({ method: "GET", id })).status).toBe(404);
  });

  it("accepts every sample body", async () => {
    for (const resource of ["users", "tickets", "projects"] as const) {
      const response = await send({
        resource,
        method: "POST",
        body: SAMPLE_BODIES[resource].POST,
      });
      expect(response.status, resource).toBe(201);
    }
  });

  it("returns 422 with field errors for invalid payloads", async () => {
    const response = await send({ method: "POST", body: '{"name":"","email":"x"}' });

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      error: "validation",
      fieldErrors: { name: "required", email: "invalidEmail" },
    });
  });

  it("returns 400 for malformed JSON and missing ids", async () => {
    expect(await send({ method: "POST", body: "{nope" })).toMatchObject({
      status: 400,
      body: { error: "invalid_json" },
    });
    expect(await send({ method: "PATCH", body: "{}" })).toMatchObject({
      status: 400,
      body: { error: "missing_id" },
    });
    expect((await send({ method: "DELETE" })).status).toBe(400);
  });

  it("rejects oversized JSON bodies and ids before they reach the service", async () => {
    expect(await send({ method: "POST", body: "x".repeat(8_193) })).toMatchObject({
      status: 400,
      body: { error: "payload_too_large" },
    });
    expect(await send({ method: "GET", id: "a".repeat(65) })).toMatchObject({
      status: 400,
      body: { error: "invalid_id" },
    });
  });

  it("returns 503 while the simulated API is failing", async () => {
    backend.network.settings.failing = true;

    expect((await send({ method: "GET" })).status).toBe(503);
  });

  it("builds the request line", () => {
    expect(requestLine(request({ method: "PATCH", id: " usr_001 " }))).toBe(
      "PATCH /users/usr_001",
    );
    expect(requestLine(request({ resource: "tickets" }))).toBe("GET /tickets");
    expect(requestLine(request({ id: "../x?y" }))).toBe("GET /users/..%2Fx%3Fy");
  });
});
