import { NextRequest } from "next/server";

// Proxy /api/* to the backend from the server (worker). Unlike a Next rewrite,
// this lets us attach a shared-secret header so the backend's Cloudflare WAF can
// allow worker→tunnel subrequests (which are otherwise blocked as CF-origin bots).
export const dynamic = "force-dynamic";

const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:8000").replace(/\/+$/, "");
const PROXY_SECRET = process.env.BACKEND_PROXY_SECRET ?? "";

async function proxy(req: NextRequest, path: string[]) {
  const search = new URL(req.url).search;
  const target = `${BACKEND_URL}/api/${path.join("/")}${search}`;

  const headers = new Headers();
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (PROXY_SECRET) headers.set("x-chevlab-proxy", PROXY_SECRET);
  // Neutral UA — not a browser string, so UA-based bot rules don't fire.
  headers.set("user-agent", "chevlab-proxy");

  const init: RequestInit = { method: req.method, headers, redirect: "manual" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  const res = await fetch(target, init);
  const outHeaders = new Headers();
  const resType = res.headers.get("content-type");
  if (resType) outHeaders.set("content-type", resType);
  return new Response(res.body, { status: res.status, headers: outHeaders });
}

type Ctx = { params: Promise<{ path: string[] }> };
const handler = async (req: NextRequest, ctx: Ctx) =>
  proxy(req, (await ctx.params).path);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
