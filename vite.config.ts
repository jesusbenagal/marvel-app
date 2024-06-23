/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: ["node_modules", "e2e/*.spec.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      exclude: [
        "src/assets/*",
        "src/router/*",
        "src/App.tsx",
        "src/api/*",
        "src/main.tsx",
      ],
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
