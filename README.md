# chevlab-frontend

Web frontend for a homelab monitoring dashboard. Displays system metrics served by the [chevlab-backend](../chevlab-backend) API.

> **Status:** in active development — landing, auth, dashboard, history, and homelab are working; todo & calendar are placeholders.

## Features

- **Landing** (`/`) — ChevLab by ChevFy, with **Login** or **Use as guest**.
- **Dashboard** (`/dashboard`, public) — live CPU / memory / swap / disk, network in/out, CPU temp, host info, and an online/offline badge. Metrics auto-refresh every 5s.
- **History** (`/history`, public) — line charts over **1h / 12h / 24h**: usage %, network rate, and CPU temperature (shown only when the host reports it).
- **Homelab** (`/homelab`, private) — running Docker containers with status, health, uptime, and published ports.
- **Auth** — single-user JWT login; private pages are gated, guests get a lock icon and are bounced to `/login`. Logout asks for confirmation.
- **Todo / Calendar** — planned; currently "coming soon" pages.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · SWR · axios · Recharts · lucide-react · managed with [pnpm](https://pnpm.io/).

## Architecture notes

- **API access** — all calls are same-origin `/api/*`, proxied to the backend by Next rewrites (`next.config.ts`). No CORS, and the backend origin never ships to the browser.
- **Auth** — JWT Bearer token kept in `localStorage`, attached per request by an axios interceptor; a `401` clears the token and redirects to login.
- **Layout** — sidebar nav on desktop (left) / bottom bar on mobile. Light theme, flat design (no gradients or shadows).

## Project structure

```
src/
  app/
    page.tsx                 # landing
    login/                   # login form
    (app)/                   # shell with nav
      dashboard/ history/    # public
      homelab/ todo/ calendar/   # homelab + private placeholders
  components/  ui/ layout/ dashboard/ history/ homelab/
  lib/         api/ hooks/ auth/ format.ts
  types/
```

## Development

```bash
cp .env.example .env.local   # then set BACKEND_URL (defaults to http://localhost:8000)
pnpm install    # install dependencies
pnpm dev        # run the dev server
pnpm build      # production build
pnpm lint       # lint
```

`.env.local` is read at server start — restart `pnpm dev` after changing it.

## Configuration

| Env var | Scope | Purpose |
|---|---|---|
| `BACKEND_URL` | server-side only | Origin that Next proxies `/api/*` to (`next.config.ts` rewrites). Not exposed to the browser — the app calls the backend same-origin, so there's no CORS and no secret leak. A trailing slash is stripped automatically. |

## Deployment — Cloudflare Workers

Runs on Cloudflare via the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter. Config lives in `wrangler.jsonc` + `open-next.config.ts`.

```bash
npx wrangler login     # once, interactive
pnpm deploy            # opennextjs-cloudflare build && deploy
pnpm preview           # optional: build + run the worker locally first
```

- **Backend origin** — `BACKEND_URL` is set in `wrangler.jsonc` under `vars` (not a secret). Next proxies `/api/*` to it from the worker, so the browser stays same-origin and the backend needs no CORS.
- The homelab backend must be reachable from Cloudflare (public URL or a **Cloudflare Tunnel** hostname).
- Keep the frontend and backend on **different hostnames** (e.g. frontend `app.chevfy.com`, backend `chevlab.chevfy.com`) — pointing `BACKEND_URL` at the frontend's own domain self-proxies.

> `pnpm preview` runs the worker locally and needs the `workerd` build script approved once: `pnpm approve-builds`. Plain `pnpm deploy` doesn't.
