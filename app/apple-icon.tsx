import { ImageResponse } from "next/og";

/** iOS / home-screen touch icon (180×180). Pure shapes, so no font needed. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const crystal = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48" width="40" height="48">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="45%" stop-color="#F4C95D"/><stop offset="100%" stop-color="#E0A93B"/>
    </linearGradient></defs>
    <path d="M20 1 L33 16 L26 46 L14 46 L7 16 Z" fill="url(#g)"/>
    <path d="M20 1 L20 46" stroke="#FFFFFF" stroke-width="1.1" opacity="0.55"/>
    <path d="M7 16 L33 16" stroke="#FFFFFF" stroke-width="1.1" opacity="0.45"/>
    <path d="M20 1 L7 16 M20 1 L33 16" stroke="#FFFFFF" stroke-width="0.9" opacity="0.45"/>
  </svg>`
).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3C2F2F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={crystal} width={92} height={110} alt="" />
      </div>
    ),
    { ...size }
  );
}
