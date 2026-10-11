import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  workers: 3,
  timeout: 60_000,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    ...["chromium", "firefox", "webkit"].map((browserName) => ({
      name: browserName,
      testMatch: /reading\.spec\.ts/,
      use: { browserName: browserName as "chromium" | "firefox" | "webkit" },
    })),
    {
      name: "mobile-chrome",
      testMatch: /touch\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-safari",
      testMatch: /touch\.spec\.ts/,
      use: { ...devices["iPhone 13"] },
    },
    { name: "seo-http", testMatch: /seo\.spec\.ts/ },
  ],
});
