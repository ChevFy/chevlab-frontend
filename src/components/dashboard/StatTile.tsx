import { Card } from "@/components/ui/Card";

/** Compact KPI tile: icon + label + big mono value. */
export function StatTile({
  label,
  value,
  unit,
  icon: Icon,
  valueClassName = "text-slate-900",
}: {
  label: string;
  value: string;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  valueClassName?: string;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-caption uppercase tracking-wide text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <p className={`font-mono text-h3 font-semibold leading-none ${valueClassName}`}>
        {value}
        {unit && <span className="ml-1 text-body font-normal text-slate-400">{unit}</span>}
      </p>
    </Card>
  );
}
