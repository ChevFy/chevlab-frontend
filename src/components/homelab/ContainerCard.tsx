import { Box, Clock } from "lucide-react";
import type { Container } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatUptime } from "@/lib/format";

type Tone = "neutral" | "ok" | "warn" | "crit";

function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (s === "running") return "ok";
  if (s === "paused" || s === "restarting" || s === "created") return "warn";
  return "crit"; // exited / dead
}

function healthTone(health: string): Tone {
  const h = health.toLowerCase();
  if (h === "healthy") return "ok";
  if (h === "starting") return "warn";
  return "crit"; // unhealthy
}

/** Published host→container port mappings, e.g. "8080→80/tcp". */
function portList(ports: Container["ports"]): string[] {
  if (!ports) return [];
  const out: string[] = [];
  for (const [containerPort, bindings] of Object.entries(ports)) {
    if (bindings?.length) {
      for (const b of bindings) out.push(`${b.HostPort}→${containerPort}`);
    }
  }
  return [...new Set(out)];
}

export function ContainerCard({ container }: { container: Container }) {
  const ports = portList(container.ports);

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 truncate font-semibold text-slate-900">
            <Box className="h-4 w-4 shrink-0 text-slate-400" />
            {container.name}
          </p>
          <p className="mt-0.5 truncate font-mono text-caption text-slate-400">
            {container.image}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge tone={statusTone(container.status)} dot>
            {container.status}
          </Badge>
          {container.health && (
            <Badge tone={healthTone(container.health)}>{container.health}</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          up {formatUptime(container.started_at)}
        </span>
        {ports.length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {ports.map((p) => (
              <code
                key={p}
                className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-slate-600"
              >
                {p}
              </code>
            ))}
          </span>
        )}
      </div>
    </Card>
  );
}
