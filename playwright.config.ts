import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  workers: 2,
  timeout: 90000,
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  use: {
    baseURL: "http://127.0.0.1:3078",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3078",
    url: "http://127.0.0.1:3078",
    reuseExistingServer: !process.env.CI,
    timeout: 90000,
  },
});
