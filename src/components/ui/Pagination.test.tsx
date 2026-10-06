import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { Pagination } from "./Pagination";

function renderPagination(overrides: Partial<Parameters<typeof Pagination>[0]> = {}) {
  const handlers = { onPageChange: vi.fn(), onPageSizeChange: vi.fn() };
  render(
    <Pagination
      page={2}
      pageCount={3}
      pageSize={10}
      pageSizeOptions={[5, 10, 20]}
      total={24}
      {...handlers}
      {...overrides}
    />,
  );
  return handlers;
}

describe("Pagination", () => {
  beforeEach(() => setLocale("en"));

  it("shows where the visitor is", () => {
    renderPagination();

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByText("24 results")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("moves to the neighbouring pages", async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination();

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it("disables the buttons that would leave the valid range", () => {
    renderPagination({ page: 1 });
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });

  it("disables next on the last page", () => {
    renderPagination({ page: 3 });
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("reports page size changes as numbers", async () => {
    const user = userEvent.setup();
    const { onPageSizeChange } = renderPagination();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Rows per page" }),
      "20",
    );

    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });
});
