import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { Breadcrumb } from "./Breadcrumb";
import { NAV_ITEMS } from "./nav";
import { SidebarContent } from "./SidebarContent";

// The router is the one real boundary here; everything else renders for real.
const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

describe("navigation", () => {
  beforeEach(() => {
    pathname.current = "/";
    act(() => setLocale("en"));
  });

  describe("sidebar", () => {
    it("links every route and marks only the current one", () => {
      pathname.current = "/engineering";
      render(<SidebarContent />);

      const nav = within(screen.getByRole("navigation", { name: "Primary" }));
      expect(nav.getAllByRole("link")).toHaveLength(NAV_ITEMS.length);
      expect(nav.getAllByRole("link", { current: "page" })).toHaveLength(1);
      expect(
        nav.getByRole("link", { name: "Engineering", current: "page" }),
      ).toHaveAttribute("href", "/engineering");
      // A nested route must not light up its parent.
      expect(nav.getByRole("link", { name: "AI-Assisted" })).not.toHaveAttribute(
        "aria-current",
      );
    });

    it("shows the unfinished project as a status, not as a link", () => {
      render(<SidebarContent />);

      const versus = screen.getByText("Versus");
      expect(versus.closest("a")).toBeNull();
      expect(
        within(versus.parentElement as HTMLElement).getByText("In development"),
      ).toBeInTheDocument();
    });

    it("opens external profiles safely in a new tab", () => {
      render(<SidebarContent />);

      const links = within(
        screen.getByRole("list", { name: "External links" }),
      ).getAllByRole("link");
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
        expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
      }
    });

    it("translates the labels with the active language", () => {
      render(<SidebarContent />);
      act(() => setLocale("pt-BR"));

      expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Experiência" })).toBeInTheDocument();
    });

    it("tells the parent when a link is used, so the drawer can close", async () => {
      const user = userEvent.setup();
      const onNavigate = vi.fn();
      // jsdom cannot navigate; cancelling the click keeps the test quiet.
      render(
        <div onClick={(event) => event.preventDefault()}>
          <SidebarContent onNavigate={onNavigate} />
        </div>,
      );

      await user.click(screen.getByRole("link", { name: "About" }));

      expect(onNavigate).toHaveBeenCalled();
    });
  });

  describe("breadcrumb", () => {
    it("shows Home on the root route", () => {
      render(<Breadcrumb />);

      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
    });

    it("builds the trail from the path and marks the last item as current", () => {
      pathname.current = "/engineering/ai-assisted";
      render(<Breadcrumb />);

      const items = screen
        .getAllByRole("listitem")
        .filter((item) => item.textContent !== "~");
      expect(items.map((item) => item.textContent)).toEqual([
        "/Engineering",
        "/AI-Assisted",
      ]);
      expect(items[0]).not.toHaveAttribute("aria-current");
      expect(items[1]).toHaveAttribute("aria-current", "page");
    });

    it("falls back to the raw segment for unknown routes", () => {
      pathname.current = "/does-not-exist";
      render(<Breadcrumb />);

      expect(screen.getByText("does-not-exist")).toBeInTheDocument();
    });
  });
});
