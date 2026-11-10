import { ImageResponse } from "next/og";

export const alt = "Zeltrio Digital Service Preview";
export const size = {
  width: 1200,
  height: 630,
};
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
          backgroundColor: "#05080f",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "9999px",
                backgroundColor: "#0c1322",
                border: "3px solid #0095ff",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Z
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
                Zeltrio
              </span>
              <span style={{ fontSize: 16, color: "#0095ff" }}>
                Digital Service
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0095ff",
            }}
          >
            Create Grow Go Digital
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.14,
              color: "#ffffff",
              maxWidth: "960px",
            }}
          >
            Websites, Search Visibility, Creator Launches, and Business Automation
          </div>
          <div style={{ fontSize: 24, color: "#cbd5e1", maxWidth: "840px" }}>
            Disciplined Digital Systems Built for Speed, Organic Discovery, and Measurable Client Conversion
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "36px",
            borderTop: "1px solid #1b2842",
            paddingTop: "24px",
            fontSize: 18,
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          <span>Website Development</span>
          <span>SEO Services</span>
          <span>Digital Marketing</span>
          <span>Business Automation</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
