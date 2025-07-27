import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const currentDate = new Date()
  .toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  .replace(/ /g, "-");

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: "/horusheresy-list-builder/",
  plugins: [react()],
  define: {
    BUILD_VERSION: JSON.stringify(process.env.npm_package_version),
    BUILD_DATE: JSON.stringify(currentDate),
    RESOURCES_URL: JSON.stringify(
      command === "serve"
        ? "/static-resources"
        : "https://hirmetrium.github.io/resources/horusheresy-list-builder",
    ),
  },
  build: {
    outDir: "./build",
    emptyOutDir: true,
  },
}));
