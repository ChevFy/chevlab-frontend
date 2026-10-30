/** Bordered container — separation via border + bg, no shadow. */
export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-5 ${className}`}
      {...props}
    />
  );
}
