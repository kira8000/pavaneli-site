import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SortDirection } from "@/domain/pagination";
import { setLocale } from "@/i18n/locale-store";
import { DataTable, type Column } from "./DataTable";

interface Row {
  id: string;
  name: string;
  role: string;
}
type SortKey = "name" | "role";

const ROWS: Row[] = [
  { id: "1", name: "Ana", role: "admin" },
  { id: "2", name: "Bruno", role: "viewer" },
  { id: "3", name: "Carla", role: "editor" },
];

const COLUMNS: Column<Row, SortKey>[] = [
  { id: "name", header: "Name", sortKey: "name", cell: (row) => row.name },
  { id: "role", header: "Role", sortKey: "role", cell: (row) => row.role },
  { id: "id", header: "Id", cell: (row) => row.id },
];

interface HarnessProps {
  onSortChange?: (key: SortKey) => void;
  sortBy?: SortKey;
  sortDirection?: SortDirection;
}

function Harness({
  onSortChange = () => {},
  sortBy,
  sortDirection = "asc",
}: HarnessProps) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  return (
    <>
      <DataTable
        caption="People"
        columns={COLUMNS}
        items={ROWS}
        getId={(row) => row.id}
        getLabel={(row) => row.name}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        selected={selected}
        onSelectedChange={setSelected}
        rowActions={(row) => <button type="button">Open {row.name}</button>}
      />
      <output data-testid="selection">{[...selected].sort().join(",")}</output>
    </>
  );
}

const table = () => within(screen.getByRole("table", { name: "People" }));

describe("DataTable", () => {
  beforeEach(() => setLocale("en"));

  it("renders a captioned table with one row per item plus the header", () => {
    render(<Harness />);

    expect(table().getAllByRole("row")).toHaveLength(ROWS.length + 1);
    expect(table().getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
  });

  it("exposes the sort state to assistive technology and reports clicks", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(<Harness sortBy="name" sortDirection="desc" onSortChange={onSortChange} />);

    expect(table().getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    expect(table().getByRole("columnheader", { name: "Role" })).toHaveAttribute(
      "aria-sort",
      "none",
    );
    // Columns without a sort key are not sortable at all.
    expect(table().getByRole("columnheader", { name: "Id" })).not.toHaveAttribute(
      "aria-sort",
    );

    await user.click(table().getByRole("button", { name: "Role" }));
    expect(onSortChange).toHaveBeenCalledWith("role");
  });

  it("selects individual rows and all rows on the page", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(table().getByRole("checkbox", { name: "Select: Bruno" }));
    expect(screen.getByTestId("selection")).toHaveTextContent("2");
    expect(
      table().getByRole("checkbox", { name: "Select all rows on this page" }),
    ).toHaveProperty("indeterminate", true);

    await user.click(
      table().getByRole("checkbox", { name: "Select all rows on this page" }),
    );
    expect(screen.getByTestId("selection")).toHaveTextContent("1,2,3");

    await user.click(
      table().getByRole("checkbox", { name: "Select all rows on this page" }),
    );
    expect(screen.getByTestId("selection")).toBeEmptyDOMElement();
  });

  it("renders row actions for every row", () => {
    render(<Harness />);

    expect(table().getByRole("button", { name: "Open Carla" })).toBeInTheDocument();
  });

  it("offers the same sort choices as stacked cards on small screens", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(<Harness sortBy="name" onSortChange={onSortChange} />);

    // Only sortable columns are offered; both layouts are in the DOM, CSS picks one.
    const select = screen.getByRole("combobox", { name: "Sort by" });
    expect(
      within(select)
        .getAllByRole("option")
        .map((option) => option.textContent),
    ).toEqual(["Name", "Role"]);

    await user.selectOptions(select, "role");
    expect(onSortChange).toHaveBeenCalledWith("role");
  });
});
