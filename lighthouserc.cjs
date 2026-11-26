module.exports = {
  ci: {
    upload: { target: "filesystem", outputDir: ".lighthouseci/report" },
    collect: {
      url: [
        "http://127.0.0.1:3079/",
        "http://127.0.0.1:3079/servicios/branding",
        "http://127.0.0.1:3079/contacto",
      ],
      startServerCommand:
        "node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3079",
      startServerReadyPattern: "Ready|Local:",
      numberOfRuns: 3,
      settings: { chromeFlags: "--headless=new --disable-gpu" },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.95 }],
        "categories:accessibility": ["warn", { minScore: 1 }],
        "categories:seo": ["warn", { minScore: 1 }],
        "categories:best-practices": ["warn", { minScore: 1 }],
      },
    },
  },
};
