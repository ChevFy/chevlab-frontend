/** Flat brand mark: a solid square badge + optional wordmark. */
export function Logo({
  size = "md",
  showWordmark = true,
}: {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}) {
  const box = { sm: "h-7 w-7 text-small", md: "h-9 w-9 text-body", lg: "h-14 w-14 text-h3" }[size];
  const name = { sm: "text-body", md: "text-h4", lg: "text-h2" }[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center rounded-md bg-primary-600 font-bold text-white ${box}`}
        aria-hidden
      >
        C
      </div>
      {showWordmark && (
        <div className="leading-tight">
          <p className={`font-bold text-slate-900 ${name}`}>ChevLab</p>
          <p className="text-caption text-slate-400">by ChevFy</p>
        </div>
      )}
    </div>
  );
}
