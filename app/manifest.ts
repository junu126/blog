import type { MetadataRoute } from "next";

// TODO: PWA 구축하기
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Junukim.me",
    short_name: "Junukim.me",
    description: `Junukim.me's blog`,
    start_url: "/",
    icons: [
      { src: "/icon3.png", sizes: "192x192", type: "image/png" },
      { src: "/icon4.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
