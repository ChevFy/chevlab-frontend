"use client";

import { useState, useMemo } from "react";
import { useHistory } from "@/lib/hooks/useSystem";
import { downsample } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { RangeToggle, type RangeHours } from "@/components/history/RangeToggle";
import { MetricLineChart } from "@/components/history/MetricLineChart";

// Public page — no AuthGuard.
export default function HistoryPage() {
  const [hours, setHours] = useState<RangeHours>(1);
  const { data, error, isLoading } = useHistory(hours);

  const rows = useMemo(() => {
    if (!data) return [];
    return downsample(data).map((p) => ({
      time: new Date(p.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      cpu: p.cpu_percent,
      memory: p.memory_percent,
      disk: p.disk_percent,
      swap: p.swap_percent,
      netIn: p.net_recv_bytes_per_sec,
      netOut: p.net_sent_bytes_per_sec,
      temp: p.cpu_temp,
    }));
  }, [data]);

  // Some machines don't report CPU temperature — only chart it when present.
  const hasTemp = useMemo(() => !!data?.some((p) => p.cpu_temp !== null), [data]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-h1 font-bold text-slate-900">History</h1>
          <p className="text-small text-slate-500">Metrics over the last {hours}h</p>
        </div>
        <RangeToggle value={hours} onChange={setHours} />
      </header>

      {isLoading && <Card className="text-small text-slate-400">Loading history…</Card>}

      {error && (
        <Card className="text-small text-red-600">
          Failed to load history — the machine may be offline.
        </Card>
      )}

      {data && rows.length === 0 && (
        <Card className="text-small text-slate-500">No data for this range yet.</Card>
      )}

      {rows.length > 0 && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-small font-semibold uppercase tracking-wide text-slate-400">
              Usage (%)
            </h2>
            <MetricLineChart
              kind="percent"
              data={rows}
              series={[
                { key: "cpu", label: "CPU", color: "#4f46e5" },
                { key: "memory", label: "Memory", color: "#10b981" },
                { key: "disk", label: "Disk", color: "#f59e0b" },
                { key: "swap", label: "Swap", color: "#64748b" },
              ]}
            />
          </Card>

          <Card>
            <h2 className="mb-4 text-small font-semibold uppercase tracking-wide text-slate-400">
              Network
            </h2>
            <MetricLineChart
              kind="rate"
              data={rows}
              series={[
                { key: "netIn", label: "Net In", color: "#4f46e5" },
                { key: "netOut", label: "Net Out", color: "#10b981" },
              ]}
            />
          </Card>

          {hasTemp && (
            <Card className="xl:col-span-2">
              <h2 className="mb-4 text-small font-semibold uppercase tracking-wide text-slate-400">
                CPU Temperature
              </h2>
              <MetricLineChart
                kind="temp"
                data={rows}
                series={[{ key: "temp", label: "CPU Temp", color: "#f43f5e" }]}
              />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
