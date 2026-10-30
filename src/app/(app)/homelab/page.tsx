import { AuthGuard } from "@/components/layout/AuthGuard";
import { ContainerList } from "@/components/homelab/ContainerList";

export default function HomelabPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-h1 font-bold text-slate-900">Homelab</h1>
          <p className="text-small text-slate-500">Running Docker containers</p>
        </header>
        <ContainerList />
      </div>
    </AuthGuard>
  );
}
