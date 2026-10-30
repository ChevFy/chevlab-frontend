import { forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 hover:border-primary-700",
  outline:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 border border-transparent hover:bg-slate-100",
  danger: "bg-white text-red-600 border border-red-300 hover:bg-red-50",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-small",
  md: "px-4 py-2 text-body",
  lg: "px-5 py-3 text-body",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

/** Flat button — solid/outline, no shadow, no gradient. */
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className = "", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
});
