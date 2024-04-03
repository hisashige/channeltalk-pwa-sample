import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Sample App Name",
        short_name: "Sample App",
        description: "Sample App Description",
        icons: [
          {
            src: "app_icon/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "app_icon/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "app_icon/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        start_url: "index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        orientation: "portrait",
        lang: "ja",
      },
    }),
  ],
});
