import { render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { LOCALE_STORAGE_KEY } from "./config";
import { setLocale, useLocale } from "./locale-store";
import { L, T } from "./T";

function CurrentLocale() {
  return <p data-testid="locale">{useLocale()}</p>;
}

describe("locale store", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    act(() => setLocale("en"));
  });

  it("switches every subscriber and persists the choice in sessionStorage", () => {
    render(
      <>
        <CurrentLocale />
        <p>
          <T k="nav.home" />
        </p>
        <p>
          <L text={{ en: "Hello", "pt-BR": "Olá" }} />
        </p>
      </>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");

    act(() => setLocale("pt-BR"));

    expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Olá")).toBeInTheDocument();
    expect(window.sessionStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt-BR");
  });

  it("keeps <html lang> in sync for assistive technology", () => {
    render(<HtmlLangSync />);
    expect(document.documentElement.lang).toBe("en");

    act(() => setLocale("pt-BR"));

    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("still switches language when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    render(<CurrentLocale />);

    act(() => setLocale("pt-BR"));

    expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
  });
});
