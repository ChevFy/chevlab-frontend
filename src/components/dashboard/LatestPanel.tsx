"use client";

import {
  Cpu,
  MemoryStick,
  HardDrive,
  Layers,
  ArrowDown,
  ArrowUp,
  Thermometer,
  RefreshCw,
} from "lucide-react";
import { useLatest } from "@/lib/hooks/useSystem";
import { Card } from "@/components/ui/Card";
import { MetricBar } from "./MetricBar";
import { StatTile } from "./StatTile";
import { formatRate } from "@/lib/format";

/** Live metrics from /api/latest — refreshes every 5s. */
export function LatestPanel() {
  const { data, error, isLoading, isValidating } = useLatest();

  if (isLoading) {
    return <Card className="text-small text-slate-400">Loading metrics…</Card>;
  }
  if (error || !data) {
    return (
      <Card className="text-small text-red-600">
        Failed to load metrics — the machine may be offline.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-3 text-small font-semibold uppercase tracking-wide text-slate-400">
          Usage
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MetricBar label="CPU" percent={data.cpu_percent} icon={Cpu} />
          <MetricBar label="Memory" percent={data.memory_percent} icon={MemoryStick} />
          <MetricBar label="Swap" percent={data.swap_percent} icon={Layers} />
          <MetricBar label="Disk" percent={data.disk_percent} icon={HardDrive} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-small font-semibold uppercase tracking-wide text-slate-400">
          Network &amp; Temp
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatTile label="Net In" value={formatRate(data.net_recv_bytes_per_sec)} icon={ArrowDown} />
          <StatTile label="Net Out" value={formatRate(data.net_sent_bytes_per_sec)} icon={ArrowUp} />
          <StatTile
            label="CPU Temp"
            value={data.cpu_temp !== null ? data.cpu_temp.toFixed(1) : "N/A"}
            unit={data.cpu_temp !== null ? "°C" : undefined}
            icon={Thermometer}
          />
        </div>
      </section>

      <p className="flex items-center gap-1.5 text-caption text-slate-400">
        <RefreshCw className={`h-3 w-3 ${isValidating ? "animate-spin" : ""}`} />
        Updated {new Date(data.timestamp).toLocaleTimeString()} · auto-refresh 5s
      </p>
    </div>
  );
}
