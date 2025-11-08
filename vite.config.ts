import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: [
          {
            name: "Roboto Mono",
            styles: "wght@400;700",
          },
          {
            name: "Roboto",
            styles: "wght@200;400;500;700;900",
          },
        ],
        preconnect: true,
        display: "swap",
      },
    }),
    svgr({
      svgrOptions: { exportType: "default" },
      include: "**/*.svg?react",
    }),
  ],
  envDir: "./env",
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    isolate: true,
    pool: "forks",
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@type": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
});
