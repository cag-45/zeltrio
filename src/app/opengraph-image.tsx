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
          background: "linear-gradient(135deg, #0b0f17 0%, #101624 55%, #161e2f 100%)",
          padding: "64px 72px",
          color: "#f2efe9",
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
                width: 64,
                height: 64,
                borderRadius: "9999px",
                backgroundColor: "#0e1422",
                border: "3px solid #4f8ef7",
                color: "#e0ac58",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              Z
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#f2efe9" }}>
                Zeltrio
              </span>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#75aaff" }}>
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
              color: "#e0ac58",
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
              color: "#f2efe9",
              maxWidth: "960px",
            }}
          >
            Websites, Search Visibility, Creator Launches, and Business Automation
          </div>
          <div style={{ fontSize: 24, color: "#c7c2b8", maxWidth: "860px" }}>
            Precision Digital Systems Engineered for Speed, Human Clarity, and Dependable Growth
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "36px",
            borderTop: "1px solid rgba(226, 222, 213, 0.16)",
            paddingTop: "24px",
            fontSize: 18,
            fontWeight: 700,
            color: "#e0ac58",
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
