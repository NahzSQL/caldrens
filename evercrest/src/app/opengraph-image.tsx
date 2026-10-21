import { ImageResponse } from "next/og";

export const alt = "Evercrest Dental Practice — Dental Care in Delaware";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0b172a 0%, #1a3152 55%, #1f6059 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="96" viewBox="0 0 40 44" fill="none">
            <path
              d="M20 2.5 4.5 8.2v12.6c0 9.6 6.4 17.4 15.5 20.7 9.1-3.3 15.5-11.1 15.5-20.7V8.2L20 2.5Z"
              stroke="#7dccc0"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M11.5 22.5c2.6 3.6 5.4 5.3 8.5 5.3s5.9-1.7 8.5-5.3" stroke="#7dccc0" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 14.5h12" stroke="#7dccc0" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>Evercrest</div>
            <div style={{ fontSize: 20, letterSpacing: 6, color: "#aee2d9", textTransform: "uppercase" }}>Dental Practice</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Confident Smiles Start Here.</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#c3d3e7" }}>Personalized dental care in Delaware</div>
        </div>
      </div>
    ),
    size,
  );
}
