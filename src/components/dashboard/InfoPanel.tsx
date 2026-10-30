"use client";

import { Cpu, HardDrive, Server, Clock, MonitorCog } from "lucide-react";
import { useInfo } from "@/lib/hooks/useSystem";
import { Card } from "@/components/ui/Card";
import { formatBytes, formatUptime } from "@/lib/format";

/** Static host info from /api/info. */
export function InfoPanel() {
  const { data, error, isLoading } = useInfo();

  if (isLoading) {
    return <Card className="text-small text-slate-400">Loading system info…</Card>;
  }
  if (error || !data) {
    return (
      <Card className="text-small text-red-600">
        Failed to load system info — the machine may be offline.
      </Card>
    );
  }

  const rows: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[] = [
    { icon: Server, label: "Hostname", value: data.hostname },
    { icon: MonitorCog, label: "OS", value: `${data.os_name} ${data.os_release}` },
    { icon: Cpu, label: "CPU", value: `${data.cpu_model} · ${data.cpu_cores}C / ${data.cpu_threads}T` },
    { icon: HardDrive, label: "Memory", value: formatBytes(data.memory_total) },
    { icon: Clock, label: "Uptime", value: formatUptime(data.boot_time) },
  ];

  return (
    <Card>
      <h2 className="text-small font-semibold uppercase tracking-wide text-slate-400">
        System
      </h2>
      <dl className="mt-4 divide-y divide-slate-100">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <dt className="flex items-center gap-2 text-small text-slate-500">
                <Icon className="h-4 w-4" />
                {r.label}
              </dt>
              <dd className="text-right text-small font-medium text-slate-800">{r.value}</dd>
            </div>
          );
        })}
      </dl>
    </Card>
  );
}
