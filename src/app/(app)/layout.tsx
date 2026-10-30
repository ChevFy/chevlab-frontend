import { Nav } from "@/components/layout/Nav";
import { Logo } from "@/components/ui/Logo";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:ml-64">
      {/* Mobile top bar (desktop uses the sidebar brand) */}
      <header className="sticky top-0 z-30 flex items-center border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <Logo size="sm" />
      </header>

      <Nav />

      {/* pad for bottom nav (mobile) / content gutters (desktop) */}
      <main className="p-4 pb-24 md:p-8 md:pb-8">{children}</main>
    </div>
  );
}
