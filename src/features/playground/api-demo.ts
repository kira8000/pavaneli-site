import { isApiError } from "@/domain/api-error";
import type { Services } from "@/services/services";

export const API_RESOURCES = ["users", "tickets", "projects"] as const;
export const HTTP_METHODS = ["GET", "POST", "PATCH", "DELETE"] as const;

export type ApiResource = (typeof API_RESOURCES)[number];
export type HttpMethod = (typeof HTTP_METHODS)[number];

export interface ApiDemoRequest {
  resource: ApiResource;
  method: HttpMethod;
  id: string;
  /** Raw JSON text, exactly as typed by the visitor. */
  body: string;
}

export interface ApiDemoResponse {
  status: number;
  body: unknown;
  durationMs: number;
}

const LIST_PAGE_SIZE = 5;

/** Valid example payloads (fictional data) so every method works on first click. */
export const SAMPLE_BODIES: Record<ApiResource, Record<"POST" | "PATCH", string>> = {
  users: {
    POST: '{\n  "name": "Ana Teste",\n  "email": "ana.teste@example.com",\n  "role": "viewer",\n  "status": "invited"\n}',
    PATCH: '{\n  "status": "active"\n}',
  },
  tickets: {
    POST: '{\n  "title": "Review the docs",\n  "description": "",\n  "status": "open",\n  "priority": "low",\n  "assigneeId": null\n}',
    PATCH: '{\n  "status": "resolved"\n}',
  },
  projects: {
    POST: '{\n  "name": "Mock Project",\n  "description": "Created from the API demo.",\n  "status": "planned",\n  "dueDate": "2026-12-31"\n}',
    PATCH: '{\n  "status": "active"\n}',
  },
};

export function methodHasBody(method: HttpMethod): method is "POST" | "PATCH" {
  return method === "POST" || method === "PATCH";
}

export function methodNeedsId(method: HttpMethod): boolean {
  return method === "PATCH" || method === "DELETE";
}

export function requestLine({ resource, method, id }: ApiDemoRequest): string {
  const target = id.trim();
  const path = target ? `/${resource}/${encodeURIComponent(target)}` : `/${resource}`;
  return `${method} ${path}`;
}

const SUCCESS_STATUS: Record<HttpMethod, number> = {
  GET: 200,
  POST: 201,
  PATCH: 200,
  DELETE: 204,
};

export const MAX_JSON_BODY_CHARS = 8_192;
export const MAX_ID_LENGTH = 64;

/** A request the client got wrong before it reached the service (HTTP 400). */
class ClientError extends Error {}

function parseBody(text: string): unknown {
  if (text.length > MAX_JSON_BODY_CHARS) throw new ClientError("payload_too_large");
  return JSON.parse(text) as unknown;
}

async function dispatch(services: Services, request: ApiDemoRequest): Promise<unknown> {
  const service = services[request.resource];
  const id = request.id.trim();
  if (id.length > MAX_ID_LENGTH) throw new ClientError("invalid_id");

  switch (request.method) {
    case "GET":
      return id ? service.get(id) : service.list({ page: 1, pageSize: LIST_PAGE_SIZE });
    case "POST":
      return service.create(parseBody(request.body));
    case "PATCH":
      if (!id) throw new ClientError("missing_id");
      return service.update(id, parseBody(request.body));
    case "DELETE":
      if (!id) throw new ClientError("missing_id");
      await service.remove(id);
      return null;
  }
}

/**
 * Runs one request through the real service layer and shapes the result like
 * an HTTP response, so the demo shows the same status codes a REST API would.
 */
export async function sendApiDemoRequest(
  services: Services,
  request: ApiDemoRequest,
): Promise<ApiDemoResponse> {
  const startedAt = performance.now();
  const elapsed = () => Math.round(performance.now() - startedAt);

  try {
    const body = await dispatch(services, request);
    return { status: SUCCESS_STATUS[request.method], body, durationMs: elapsed() };
  } catch (error) {
    if (isApiError(error)) {
      const body = { error: error.code, fieldErrors: error.fieldErrors };
      return { status: error.status, body, durationMs: elapsed() };
    }
    if (error instanceof SyntaxError) {
      return { status: 400, body: { error: "invalid_json" }, durationMs: elapsed() };
    }
    if (error instanceof ClientError) {
      return { status: 400, body: { error: error.message }, durationMs: elapsed() };
    }
    return { status: 500, body: { error: "unexpected" }, durationMs: elapsed() };
  }
}
