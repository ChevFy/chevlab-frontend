import { Card } from "@/components/ui/Card";
import { metricTone, toneClasses } from "@/lib/format";

/** A labelled percentage metric with a flat, tone-colored progress bar. */
export function MetricBar({
  label,
  percent,
  icon: Icon,
}: {
  label: string;
  percent: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  const tone = toneClasses[metricTone(clamped)];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-small text-slate-500">
          <Icon className="h-4 w-4" />
          {label}
        </span>
        <span className={`font-mono text-h4 font-semibold ${tone.text}`}>
          {percent.toFixed(1)}%
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${tone.bar}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </Card>
  );
}
