"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

/** Login/Logout control (with logout confirm). Used in the desktop sidebar and
 *  the mobile top bar. */
export function AuthButton({ variant = "sidebar" }: { variant?: "sidebar" | "topbar" }) {
  const { isAuthed, signOut } = useAuth();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);

  const handleLogout = () => {
    setConfirm(false);
    signOut();
    router.push("/");
  };

  const base =
    variant === "sidebar"
      ? "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-small font-medium transition-colors"
      : "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-small font-medium transition-colors";

  return (
    <>
      {isAuthed ? (
        <button onClick={() => setConfirm(true)} className={`${base} text-red-600 hover:bg-red-50`}>
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>
      ) : (
        <Link href="/login" className={`${base} text-primary-600 hover:bg-primary-50`}>
          <LogIn className="h-5 w-5 shrink-0" />
          <span>Login</span>
        </Link>
      )}

      <ConfirmDialog
        open={confirm}
        title="Log out?"
        message="You'll need to sign in again to access private pages."
        confirmLabel="Logout"
        onConfirm={handleLogout}
        onCancel={() => setConfirm(false)}
      />
    </>
  );
}
