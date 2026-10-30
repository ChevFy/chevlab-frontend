/** Display formatters. */

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
}

/** Per-second byte rate → human string. */
export function formatRate(bytesPerSec: number): string {
  return `${formatBytes(bytesPerSec)}/s`;
}

/** Compact rate for chart axes/ticks, e.g. "70K/s". */
export function formatRateShort(bytesPerSec: number): string {
  if (bytesPerSec <= 0) return "0";
  const units = ["B", "K", "M", "G"];
  const i = Math.min(Math.floor(Math.log(bytesPerSec) / Math.log(1024)), units.length - 1);
  return `${(bytesPerSec / 1024 ** i).toFixed(0)}${units[i]}/s`;
}

export type Tone = "ok" | "warn" | "crit";

/** Threshold tone for a percentage metric. */
export function metricTone(percent: number): Tone {
  if (percent >= 85) return "crit";
  if (percent >= 60) return "warn";
  return "ok";
}

/** Tailwind classes per tone. */
export const toneClasses: Record<Tone, { text: string; bar: string; dot: string }> = {
  ok: { text: "text-emerald-600", bar: "bg-emerald-500", dot: "bg-emerald-500" },
  warn: { text: "text-amber-600", bar: "bg-amber-500", dot: "bg-amber-500" },
  crit: { text: "text-red-600", bar: "bg-red-500", dot: "bg-red-500" },
};

/** True when a metric timestamp is recent enough to call the host "online". */
export function isRecent(iso: string, maxAgeMs = 30_000): boolean {
  return Date.now() - new Date(iso).getTime() < maxAgeMs;
}

/** Evenly thin an array to at most `max` items (keeps first + last). */
export function downsample<T>(arr: T[], max = 180): T[] {
  if (arr.length <= max) return arr;
  const stride = Math.ceil(arr.length / max);
  const out = arr.filter((_, i) => i % stride === 0);
  if (out[out.length - 1] !== arr[arr.length - 1]) out.push(arr[arr.length - 1]);
  return out;
}

/** Uptime since an ISO boot time → "Xd Yh Zm". */
export function formatUptime(bootTimeIso: string): string {
  const secs = Math.max(0, (Date.now() - new Date(bootTimeIso).getTime()) / 1000);
  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h || d) parts.push(`${h}h`);
  parts.push(`${m}m`);
  return parts.join(" ");
}
