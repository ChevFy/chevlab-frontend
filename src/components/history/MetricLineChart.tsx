"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatRateShort } from "@/lib/format";

export type Series = { key: string; label: string; color: string };

/** Flat multi-line chart over a time axis. `kind` sets the value formatting. */
export function MetricLineChart({
  data,
  series,
  kind,
}: {
  data: Record<string, number | string | null>[];
  series: Series[];
  kind: "percent" | "rate" | "temp";
}) {
  const fmt = (v: number) =>
    kind === "percent" ? `${v.toFixed(0)}%` : kind === "temp" ? `${v.toFixed(0)}°C` : formatRateShort(v);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
        <CartesianGrid stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
          minTickGap={40}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={false}
          width={48}
          domain={kind === "percent" ? [0, 100] : [0, "auto"]}
          tickFormatter={fmt}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            fontSize: 12,
          }}
          formatter={(v, name) => [fmt(Number(v)), name as string]}
        />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 12 }} />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            connectNulls
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
