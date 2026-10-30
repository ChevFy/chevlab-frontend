# chevlab-frontend

Web frontend for a homelab monitoring dashboard. Displays system metrics served by the [chevlab-backend](../chevlab-backend) API.

> **Status:** early development — project is initialized, features are not implemented yet.

## Planned features

- **Live metrics** — CPU, RAM, disk, temperature, and uptime, auto-refreshing every few seconds.
- **History graphs** — 1-hour / 24-hour views, rendered from the backend's sampled metrics.
- **Online/offline status** — with a dedicated offline page.
- **Authentication** — single-user login protecting private pages.
- **Docker** — list of running containers (private).
- **Alerts** — surfaces alerts when the CPU runs hot or the machine has problems.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · SWR · axios · Recharts · lucide-react · managed with [pnpm](https://pnpm.io/).

## Development

```bash
cp .env.example .env.local   # then set BACKEND_URL (defaults to http://localhost:8000)
pnpm install    # install dependencies
pnpm dev        # run the dev server
pnpm build      # production build
pnpm lint       # lint
```

## Configuration

| Env var | Scope | Purpose |
|---|---|---|
| `BACKEND_URL` | server-side only | Origin that Next proxies `/api/*` to (`next.config.ts` rewrites). Not exposed to the browser — the app calls the backend same-origin, so there's no CORS and no secret leak. |

## Deployment

Frontend on **Cloudflare**, backend on your **homelab**:

1. Expose the homelab backend to the internet (public URL or a **Cloudflare Tunnel** hostname).
2. In the Cloudflare Pages/Workers project, set the `BACKEND_URL` env var to that URL.
3. The browser only ever talks to the frontend origin; Cloudflare proxies `/api/*` to the backend, so the backend needs no CORS config.
