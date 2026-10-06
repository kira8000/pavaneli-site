import { beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY, isTheme } from "./theme";

function runInitScript() {
  // The script is built from constants only; running it is exactly what the browser does.
  new Function(THEME_INIT_SCRIPT)();
}

describe("theme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    vi.restoreAllMocks();
  });

  it("recognises only known themes", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("light")).toBe(true);
    expect(isTheme("sepia")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  describe("init script (runs before first paint)", () => {
    it("applies a stored theme", () => {
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
      runInitScript();

      expect(document.documentElement).toHaveAttribute("data-theme", "light");
    });

    it("leaves the default alone when nothing valid is stored", () => {
      runInitScript();
      expect(document.documentElement).not.toHaveAttribute("data-theme");

      window.localStorage.setItem(THEME_STORAGE_KEY, '"><script>alert(1)</script>');
      runInitScript();
      expect(document.documentElement).not.toHaveAttribute("data-theme");
    });

    it("does not throw when storage is blocked", () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new DOMException("blocked", "SecurityError");
      });

      expect(runInitScript).not.toThrow();
    });
  });
});
