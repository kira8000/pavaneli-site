"use client";

import { useState, type FormEvent } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { useT } from "@/i18n/locale-store";
import { cn } from "@/lib/cn";
import {
  API_RESOURCES,
  HTTP_METHODS,
  SAMPLE_BODIES,
  methodHasBody,
  methodNeedsId,
  requestLine,
  sendApiDemoRequest,
  type ApiDemoResponse,
  type ApiResource,
  type HttpMethod,
} from "./api-demo";
import { getBackend } from "./backend";

const HTTP_ERROR_FLOOR = 400;
const SERVER_ERROR_FLOOR = 500;

function statusTone(status: number): BadgeTone {
  if (status >= SERVER_ERROR_FLOOR) return "danger";
  return status >= HTTP_ERROR_FLOOR ? "warning" : "accent";
}

function initialBody(resource: ApiResource, method: HttpMethod, current: string): string {
  return methodHasBody(method) ? SAMPLE_BODIES[resource][method] : current;
}

export function ApiDemoTab() {
  const t = useT();
  const [resource, setResource] = useState<ApiResource>("users");
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState<ApiDemoResponse | null>(null);

  const request = { resource, method, id, body };
  const hasBody = methodHasBody(method);

  function changeResource(next: ApiResource) {
    setResource(next);
    setBody(initialBody(next, method, body));
  }

  function changeMethod(next: HttpMethod) {
    setMethod(next);
    setBody(initialBody(resource, next, body));
  }

  async function send(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setResponse(await sendApiDemoRequest(getBackend().services, request));
    setSending(false);
  }

  return (
    <div className="space-y-6">
      <p className="text-muted max-w-2xl text-sm">{t("playground.api.description")}</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={send} className="space-y-4">
          <SelectField
            label={t("playground.api.resource")}
            value={resource}
            onChange={(event) => changeResource(event.target.value as ApiResource)}
            options={API_RESOURCES.map((value) => ({ value, label: `/${value}` }))}
          />

          <fieldset>
            <legend className="text-muted mb-1.5 text-sm font-medium">
              {t("playground.api.method")}
            </legend>
            <div className="flex flex-wrap gap-2">
              {HTTP_METHODS.map((value) => (
                <label
                  key={value}
                  className={cn(
                    "has-[:focus-visible]:outline-accent cursor-pointer rounded-md border px-3 py-2 font-mono text-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                    value === method
                      ? "border-accent text-accent"
                      : "border-border text-muted hover:text-fg",
                  )}
                >
                  <input
                    type="radio"
                    name="http-method"
                    value={value}
                    checked={value === method}
                    onChange={() => changeMethod(value)}
                    className="sr-only"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          <TextField
            label={
              methodNeedsId(method)
                ? t("playground.api.idRequired")
                : t("playground.api.idOptional")
            }
            required={methodNeedsId(method)}
            placeholder="usr_001"
            autoComplete="off"
            spellCheck={false}
            value={id}
            onChange={(event) => setId(event.target.value)}
          />

          <TextAreaField
            label={t("playground.api.body")}
            rows={8}
            spellCheck={false}
            disabled={!hasBody}
            value={hasBody ? body : ""}
            onChange={(event) => setBody(event.target.value)}
          />

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              variant="primary"
              disabled={sending}
              aria-busy={sending}
            >
              {sending ? t("playground.api.sending") : t("playground.api.send")}
            </Button>
            <code className="text-muted font-mono text-sm break-all">
              {requestLine(request)}
            </code>
          </div>
        </form>

        <div aria-live="polite" aria-busy={sending}>
          <h3 className="text-muted mb-2 text-sm font-medium">
            {t("playground.api.response")}
          </h3>
          {response ? (
            <div className="border-border bg-surface rounded-md border">
              <div className="border-border flex flex-wrap items-center gap-3 border-b p-3">
                <Badge tone={statusTone(response.status)}>{response.status}</Badge>
                <span className="text-muted font-mono text-xs">
                  {response.durationMs} ms
                </span>
              </div>
              <pre
                tabIndex={0}
                className="max-h-96 overflow-auto p-3 font-mono text-xs leading-relaxed"
              >
                {response.body === null
                  ? t("playground.api.noContent")
                  : JSON.stringify(response.body, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="border-border text-subtle rounded-md border border-dashed p-6 text-center text-sm">
              {t("playground.api.noResponse")}
            </p>
          )}
          <p className="text-subtle mt-3 text-xs">{t("playground.api.simulated")}</p>
        </div>
      </div>
    </div>
  );
}
