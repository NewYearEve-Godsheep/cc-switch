import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setupGlobals.ts", "./tests/setupTests.ts"],
    globals: true,
    // The component/integration suites share a jsdom-heavy setup. Serializing
    // files avoids resource contention in WSL and prevents a timed-out suite
    // from leaving its DOM mounted while another suite is running.
    fileParallelism: false,
    testTimeout: 15_000,
    hookTimeout: 20_000,
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
