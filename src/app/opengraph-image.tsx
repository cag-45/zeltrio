import { ImageResponse } from "next/og";

export const alt = "Zeltrio Digital Service preview";
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
          backgroundColor: "#f7f6f2",
          padding: "64px 72px",
          color: "#14171c",
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
                backgroundColor: "#06080b",
                border: "3px solid #154380",
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
              <span style={{ fontSize: 28, fontWeight: 700, color: "#14171c" }}>
                Zeltrio
              </span>
              <span style={{ fontSize: 16, color: "#5f6773" }}>
                Digital Service
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#154380",
            }}
          >
            Create Grow Go Digital
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#14171c",
              maxWidth: "960px",
            }}
          >
            Websites, search visibility, digital marketing, and business automation.
          </div>
          <div style={{ fontSize: 24, color: "#434a54", maxWidth: "820px" }}>
            Disciplined digital systems built for speed, organic discovery, and measurable client conversion.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "36px",
            borderTop: "1px solid #dad7cd",
            paddingTop: "24px",
            fontSize: 18,
            fontWeight: 600,
            color: "#14171c",
          }}
        >
          <span>Website development</span>
          <span>SEO services</span>
          <span>Digital marketing</span>
          <span>Business automation</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

