"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  LineChart,
  Server,
  ListTodo,
  CalendarDays,
  Lock,
  LogIn,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Logo } from "@/components/ui/Logo";

type Item = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  protected: boolean;
};

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, protected: false },
  { href: "/history", label: "History", icon: LineChart, protected: false },
  { href: "/homelab", label: "Homelab", icon: Server, protected: true },
  { href: "/todo", label: "Todo", icon: ListTodo, protected: true },
  { href: "/calendar", label: "Calendar", icon: CalendarDays, protected: true },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthed, signOut } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleNav = (item: Item, e: React.MouseEvent) => {
    if (item.protected && !isAuthed) {
      e.preventDefault();
      router.push("/login");
    }
  };

  const handleLogout = () => {
    setConfirmLogout(false);
    signOut();
    router.push("/");
  };

  const links = items.map((item) => {
    const Icon = item.icon;
    const active = pathname === item.href;
    const locked = item.protected && !isAuthed;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={(e) => handleNav(item, e)}
        aria-current={active ? "page" : undefined}
        className={`group relative flex flex-1 flex-col items-center gap-1 rounded-md px-3 py-2 text-caption transition-colors md:flex-none md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-small ${
          active
            ? "bg-primary-50 font-medium text-primary-700"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <span
          className={`absolute left-0 top-1/2 hidden h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-600 md:block ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <Icon className="h-5 w-5 shrink-0" />
        <span className="flex items-center gap-1">
          {item.label}
          {locked && <Lock className="h-3 w-3 opacity-60" />}
        </span>
      </Link>
    );
  });

  const authButton = isAuthed ? (
    <button
      onClick={() => setConfirmLogout(true)}
      className="flex flex-1 flex-col items-center gap-1 rounded-md px-3 py-2 text-caption text-red-600 transition-colors hover:bg-red-50 md:flex-none md:flex-row md:gap-3 md:py-2.5 md:text-small"
    >
      <LogOut className="h-5 w-5 shrink-0" />
      <span>Logout</span>
    </button>
  ) : (
    <Link
      href="/login"
      className="flex flex-1 flex-col items-center gap-1 rounded-md px-3 py-2 text-caption text-primary-600 transition-colors hover:bg-primary-50 md:flex-none md:flex-row md:gap-3 md:py-2.5 md:text-small"
    >
      <LogIn className="h-5 w-5 shrink-0" />
      <span>Login</span>
    </Link>
  );

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around gap-1 border-t border-slate-200 bg-white/95 px-2 py-1 backdrop-blur md:inset-y-0 md:left-0 md:right-auto md:w-64 md:flex-col md:justify-start md:gap-1 md:border-r md:border-t-0 md:bg-white md:p-4">
        <div className="hidden px-2 pb-6 pt-2 md:block">
          <Logo size="md" />
        </div>
        {links}
        <div className="md:mt-auto md:border-t md:border-slate-200 md:pt-2">{authButton}</div>
      </nav>

      <ConfirmDialog
        open={confirmLogout}
        title="Log out?"
        message="You'll need to sign in again to access private pages."
        confirmLabel="Logout"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />
    </>
  );
}
