import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      // Redirect old favicon path to new location
      "/tailwind-dashboard-template/src/favicon.svg": "/favicon.svg",
    },
  },

  base: "/",
  publicDir: "public",
});
