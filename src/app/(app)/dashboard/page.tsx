import { InfoPanel } from "@/components/dashboard/InfoPanel";
import { LatestPanel } from "@/components/dashboard/LatestPanel";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-h1 font-bold text-slate-900">Dashboard</h1>
          <p className="text-small text-slate-500">Real-time homelab status</p>
        </div>
        <StatusBadge />
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <InfoPanel />
        </div>
        <div className="lg:col-span-2">
          <LatestPanel />
        </div>
      </div>
    </div>
  );
}
