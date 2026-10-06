/**
 * Hardcoded dark-theme colors for surfaces that cannot read CSS variables:
 * Open Graph images and the Apple touch icon (satori / ImageResponse).
 * Keep in sync with `:root` in `globals.css`.
 */
export const BRAND = {
  bg: "#0a0b0a",
  fg: "#e6e9e7",
  muted: "#a1aba6",
  accent: "#34f08a",
} as const;
