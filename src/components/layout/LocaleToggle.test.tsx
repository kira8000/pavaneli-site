import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { LOCALE_STORAGE_KEY } from "@/i18n/config";
import { setLocale } from "@/i18n/locale-store";
import { LocaleToggle } from "./LocaleToggle";

describe("LocaleToggle", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setLocale("en");
    window.sessionStorage.clear();
  });

  it("switches language, relabels itself and persists the choice in sessionStorage", async () => {
    const user = userEvent.setup();
    render(<LocaleToggle />);

    await user.click(
      screen.getByRole("button", { name: /switch language to português/i }),
    );

    expect(window.sessionStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt-BR");
    expect(
      screen.getByRole("button", { name: /mudar idioma para english/i }),
    ).toHaveTextContent("PT");
  });
});
