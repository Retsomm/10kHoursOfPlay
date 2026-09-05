import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "10,000 Hours of Play",
  short_name: "10K HP",
  description: "把人生活成一場你能玩到通關的遊戲——建立你的英雄角色卡，記錄成長旅程。",
  start_url: "/",
  display: "standalone",
  background_color: "#050914",
  theme_color: "#050914",
  icons: [
    {
      src: "/brand/icon-192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/brand/logo-mark-512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
});

export default manifest;
