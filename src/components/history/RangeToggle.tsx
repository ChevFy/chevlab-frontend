"use client";

export type RangeHours = 1 | 12 | 24;

const options: { hours: RangeHours; label: string }[] = [
  { hours: 1, label: "1h" },
  { hours: 12, label: "12h" },
  { hours: 24, label: "24h" },
];

/** Segmented control for the history time range. */
export function RangeToggle({
  value,
  onChange,
}: {
  value: RangeHours;
  onChange: (h: RangeHours) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
      {options.map((o) => {
        const active = o.hours === value;
        return (
          <button
            key={o.hours}
            onClick={() => onChange(o.hours)}
            aria-pressed={active}
            className={`rounded px-3 py-1.5 text-small font-medium transition-colors ${
              active
                ? "bg-primary-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
