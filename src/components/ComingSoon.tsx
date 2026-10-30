import Link from "next/link";
import { Construction } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/** Placeholder for features still in development. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Construction className="h-8 w-8 text-primary-600" />
      </div>
      <div className="space-y-2">
        <Badge tone="warn">Coming soon</Badge>
        <h1 className="text-h2 font-bold text-slate-900">{title}</h1>
        <p className="max-w-sm text-body text-slate-500">
          This page is a planned feature and isn&apos;t available yet. Check back soon.
        </p>
      </div>
      <Link href="/dashboard">
        <Button variant="outline">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
