"use client";

import { useLatest } from "@/lib/hooks/useSystem";
import { Badge } from "@/components/ui/Badge";
import { isRecent } from "@/lib/format";

/** Online/offline pill driven by /api/latest (SWR cache shared with the panels). */
export function StatusBadge() {
  const { data, error, isLoading } = useLatest();

  if (isLoading) return <Badge tone="neutral">Checking…</Badge>;

  const online = !error && !!data && isRecent(data.timestamp);
  return online ? (
    <Badge tone="ok" dot pulse>
      Online
    </Badge>
  ) : (
    <Badge tone="crit" dot>
      Offline
    </Badge>
  );
}
