import { Nav } from "@/components/layout/Nav";
import { Logo } from "@/components/ui/Logo";
import { AuthButton } from "@/components/layout/AuthButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:ml-64">
      {/* Mobile top bar: brand left, auth top-right (desktop uses the sidebar) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <Logo size="sm" />
        <AuthButton variant="topbar" />
      </header>

      <Nav />

      {/* pad for bottom nav (mobile) / content gutters (desktop) */}
      <main className="p-4 pb-24 md:p-8 md:pb-8">{children}</main>
    </div>
  );
}
