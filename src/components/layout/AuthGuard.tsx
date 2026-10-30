"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

/** Wrap protected pages. Guests/anon are redirected to /login. */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace("/login");
    }
  }, [ready, isAuthed, router]);

  if (!ready || !isAuthed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-small text-slate-400">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}
