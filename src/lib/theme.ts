export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return THEMES.some((theme) => theme === value);
}

/**
 * Runs in <head> before first paint so the stored theme never flashes.
 * The string is built only from the constants above (no external input),
 * which is what makes `dangerouslySetInnerHTML` safe here.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="${THEMES[0]}"||t==="${THEMES[1]}")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
