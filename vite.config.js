import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "vite.config.js",
        "tailwind.config.js",
        "postcss.config.js",
        "src/setupTests.js",
      ],
    },
  },
});
