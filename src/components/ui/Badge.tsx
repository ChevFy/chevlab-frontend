type Tone = "neutral" | "ok" | "warn" | "crit";

const tones: Record<Tone, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warn: "border-amber-200 bg-amber-50 text-amber-700",
  crit: "border-red-200 bg-red-50 text-red-700",
};

const dots: Record<Tone, string> = {
  neutral: "bg-slate-400",
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  crit: "bg-red-500",
};

/** Flat status pill with a leading dot. */
export function Badge({
  tone = "neutral",
  dot = false,
  pulse = false,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-caption font-medium ${tones[tone]}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dots[tone]}`}
            />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dots[tone]}`} />
        </span>
      )}
      {children}
    </span>
  );
}
