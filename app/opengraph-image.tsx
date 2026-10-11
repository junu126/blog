import { ImageResponse } from "next/og";

export const alt = "junukim.me — Notes on building things and living well";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#faf9f6",
        color: "#252522",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 32 }}>Junwoo Kim · Product Engineer</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 100, fontWeight: 700, letterSpacing: -4 }}>
          junukim.me
        </div>
        <div style={{ fontSize: 36, color: "#575750" }}>
          Notes on building things and living well.
        </div>
      </div>
      <div style={{ height: 2, background: "#252522", width: "100%" }} />
    </div>,
    size,
  );
}
