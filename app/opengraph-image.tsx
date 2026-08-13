import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#030209",
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          padding: "90px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "radial-gradient(circle at 12% 18%, rgba(168,85,247,0.35), transparent 55%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 46 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              border: "3px solid #A855F7",
              background: "linear-gradient(180deg, #1a0f2e 0%, #030209 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "#A855F7",
              fontFamily: "monospace",
            }}
          >
            {">_"}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8f82a6", fontFamily: "monospace", letterSpacing: 1 }}>
            $ whoami → anonymous
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 90,
            fontWeight: 800,
            color: "#e8e6f0",
            fontFamily: "monospace",
            letterSpacing: -2,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          GHOST VPN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 90,
            fontWeight: 800,
            backgroundImage: "linear-gradient(90deg, #a855f7, #39ff88)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "monospace",
            letterSpacing: -2,
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          BROWSE INVISIBLE
        </div>

        <div style={{ display: "flex", fontSize: 27, color: "#8f82a6", fontFamily: "monospace", marginTop: 34 }}>
          AES-256 · WireGuard® · 6,512 servers · zero logs
        </div>
      </div>
    ),
    { ...size }
  );
}
