/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site ships with hand-authored SVG illustrations and needs no remote
  // images out of the box. When the pasticceria adds their real photography,
  // drop the files in /public and reference them with next/image — or, if they
  // host on a CDN / Instagram, whitelist the domain here.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Example — uncomment and adjust when wiring real remote photos:
      // { protocol: "https", hostname: "images.cristallidizucchero.it" },
    ],
  },
};

export default nextConfig;
