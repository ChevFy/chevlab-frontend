"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { login } from "@/lib/api/system";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await login({ username, password });
      signIn(access_token);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Incorrect username or password.");
      } else {
        setError("Login failed — make sure the backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-body text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100";

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo size="md" />
        </div>
        <h1 className="text-h3 font-bold text-slate-900">Login</h1>
        <p className="mt-1 text-small text-slate-400">Sign in to continue</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-small font-medium">Username</label>
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-small font-medium">Password</label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-small text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back
          </Button>
        </form>
      </Card>
    </main>
  );
}
