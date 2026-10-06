import { ImageResponse } from "next/og";
import { PROFILE } from "@/content/profile";
import { BRAND } from "@/lib/brand";

export const alt = `${PROFILE.name}, ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: BRAND.bg,
        color: BRAND.fg,
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, color: BRAND.accent }}>{">_"}</div>
      <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 32 }}>
        {PROFILE.name}
      </div>
      <div style={{ display: "flex", fontSize: 44, color: BRAND.accent, marginTop: 16 }}>
        {PROFILE.role}
      </div>
      <div style={{ display: "flex", fontSize: 32, color: BRAND.muted, marginTop: 40 }}>
        {PROFILE.stackSummary}
      </div>
    </div>,
    size,
  );
}
