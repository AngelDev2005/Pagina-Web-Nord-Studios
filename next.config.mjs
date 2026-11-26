const prod = process.env.NODE_ENV === "production";
const policy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com" +
    (process.env.GA4_ID ? " https://www.googletagmanager.com" : "") +
    (prod ? "" : " 'unsafe-eval'"),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com" +
    (process.env.GA4_ID
      ? " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com"
      : "") +
    (prod ? "" : " ws:"),
  "frame-src https://challenges.cloudflare.com",
  "form-action 'self'",
].join("; ");
const config = {
  outputFileTracingIncludes: {
    "/*": ["./content/projects/**/*.json", "./content/projects/**/*.mdx", "./content/blog/**/*.mdx"],
  },
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: policy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(prod
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
    ];
  },
};

export default config;
