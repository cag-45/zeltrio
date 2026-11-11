import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9999px",
          background: "linear-gradient(135deg, #0b0f17 0%, #161e2f 100%)",
          border: "2.5px solid #4f8ef7",
          color: "#f2efe9",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#e0ac58" }}>Z</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
