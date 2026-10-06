import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { ToastRegion, dismissToast, showToast } from "./toast";

const TOAST_LIFETIME_MS = 5000;

describe("toast", () => {
  beforeEach(() => {
    setLocale("en");
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    // The store is module-level, so clear whatever a test left behind.
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
  });

  it("announces confirmations politely and errors assertively", () => {
    render(<ToastRegion />);

    act(() => {
      showToast("success", "Saved.");
      showToast("error", "Could not save.");
    });

    expect(screen.getByRole("status")).toHaveTextContent("Saved.");
    expect(screen.getByRole("alert")).toHaveTextContent("Could not save.");
    expect(screen.getByRole("list", { name: "Notifications" })).toBeInTheDocument();
  });

  it("dismisses on its own after a few seconds", () => {
    render(<ToastRegion />);
    act(() => showToast("success", "Saved."));
    expect(screen.getByText("Saved.")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(TOAST_LIFETIME_MS);
    });

    expect(screen.queryByText("Saved.")).not.toBeInTheDocument();
  });

  it("can be dismissed by the visitor", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastRegion />);
    act(() => showToast("success", "Saved."));

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(screen.queryByText("Saved.")).not.toBeInTheDocument();
  });

  it("ignores dismissing a toast that is already gone", () => {
    render(<ToastRegion />);

    expect(() => act(() => dismissToast(9999))).not.toThrow();
  });
});
