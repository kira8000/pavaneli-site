import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { Modal } from "./Modal";

function renderModal(open: boolean, onClose = vi.fn()) {
  const view = render(
    <Modal open={open} onClose={onClose} title="Edit user">
      <button type="button">Inside</button>
    </Modal>,
  );
  return { ...view, onClose };
}

describe("Modal", () => {
  beforeEach(() => setLocale("en"));

  it("stays closed until opened, then exposes a named dialog", () => {
    const { rerender, onClose } = renderModal(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Modal open onClose={onClose} title="Edit user">
        <button type="button">Inside</button>
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Edit user" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Edit user" })).toBeInTheDocument();
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal(true);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked, but not when the content is", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal(true);

    await user.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
