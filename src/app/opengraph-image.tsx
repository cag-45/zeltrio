import { ImageResponse } from "next/og";

export const alt = "Zeltrio Digital Services Preview";
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
          backgroundColor: "#ffffff",
          padding: "64px 72px",
          color: "#061a40",
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
                width: 60,
                height: 60,
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                border: "4px solid #0066ff",
                color: "#061a40",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              Z
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#061a40" }}>
                Zeltrio
              </span>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#0066ff" }}>
                Digital Services
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0066ff",
            }}
          >
            Accelerate Your Business Growth
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.14,
              color: "#061a40",
              maxWidth: "960px",
            }}
          >
            Websites, Search Visibility, Creator Launches, and Business Automation
          </div>
          <div style={{ fontSize: 24, color: "#334155", maxWidth: "840px" }}>
            Disciplined Digital Systems Built for Speed, Organic Discovery, and Measurable Client Conversion
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "36px",
            borderTop: "2px solid #d6e1f0",
            paddingTop: "24px",
            fontSize: 18,
            fontWeight: 700,
            color: "#061a40",
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
