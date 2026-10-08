import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { CopyEmailButton } from "./CopyEmailButton";

describe("CopyEmailButton", () => {
  beforeEach(() => setLocale("en"));

  it("copies the address and announces success", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyEmailButton email="dev@example.com" />);

    await user.click(screen.getByRole("button", { name: "Copy email" }));

    expect(writeText).toHaveBeenCalledWith("dev@example.com");
    expect(screen.getByRole("button", { name: "Email copied" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Email copied");
  });
});
