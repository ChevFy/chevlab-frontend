"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  const router = useRouter();
  const { continueAsGuest } = useAuth();

  const guest = () => {
    continueAsGuest();
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Logo size="lg" showWordmark={false} />

        <h1 className="mt-6 text-display font-bold text-slate-900">ChevLab</h1>
        <p className="mt-1 text-h4 text-slate-400">by ChevFy</p>

        <div className="mt-4">
          <Badge tone="ok" dot pulse>
            Homelab monitoring
          </Badge>
        </div>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Button size="lg" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button size="lg" variant="outline" onClick={guest}>
            Use as guest
          </Button>
        </div>

        <p className="mt-6 text-caption text-slate-400">
          Guests can view the dashboard. Login for private pages.
        </p>
      </div>
    </main>
  );
}
