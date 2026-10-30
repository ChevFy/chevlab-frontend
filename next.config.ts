import type { NextConfig } from "next";

// Backend origin to proxy /api/* to. Override with BACKEND_URL in the environment.
// Strip trailing slash(es) so `https://host/` doesn't become `https://host//api/...` (→ 404).
const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:8000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  // Proxy API calls through Next (same-origin) so the browser avoids CORS.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Lets `next dev` talk to Cloudflare bindings via @opennextjs/cloudflare.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
