import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // /api/* is proxied by the catch-all route handler (src/app/api/[...path]/route.ts),
  // which attaches a shared-secret header the backend WAF allows.
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
