import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Clear Cycle Resources – Better Connections. Better Coordinated Care.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07366A",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 48 48">
            <g fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">
              <path d="M30.37 8.24A17 17 0 0 1 40.83 26.37" />
              <path d="M34.47 37.4A17 17 0 0 1 13.53 37.4" />
              <path d="M7.17 26.37A17 17 0 0 1 17.63 8.24" />
            </g>
            <g fill="#00A88F">
              <circle cx="24" cy="7" r="4.25" />
              <circle cx="38.72" cy="32.5" r="4.25" />
              <circle cx="9.28" cy="32.5" r="4.25" />
              <rect x="21.75" y="17" width="4.5" height="14" rx="1.6" />
              <rect x="17" y="21.75" width="14" height="4.5" rx="1.6" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Clear Cycle</div>
            <div style={{ fontSize: 20, letterSpacing: 8, color: "#7FE0D0", marginTop: 4 }}>RESOURCES</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2 }}>
            Better Connections.
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, color: "#7FE0D0" }}>
            Better Coordinated Care.
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "rgba(255,255,255,0.8)" }}>
            Healthcare operations, care coordination, and provider communication support
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>{siteConfig.domain}</div>
      </div>
    ),
    size,
  );
}
