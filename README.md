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
pnpm install    # install dependencies
pnpm dev        # run the dev server
pnpm build      # production build
pnpm lint       # lint
```
