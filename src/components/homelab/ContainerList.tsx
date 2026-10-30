"use client";

import axios from "axios";
import { Box } from "lucide-react";
import { useContainers } from "@/lib/hooks/useSystem";
import { Card } from "@/components/ui/Card";
import { ContainerCard } from "./ContainerCard";

export function ContainerList() {
  const { data, error, isLoading } = useContainers();

  if (isLoading) {
    return <Card className="text-small text-slate-400">Loading containers…</Card>;
  }

  if (error) {
    // Backend returns 503 when the Docker daemon isn't reachable.
    const docker503 = axios.isAxiosError(error) && error.response?.status === 503;
    return (
      <Card className="text-small text-red-600">
        {docker503
          ? "Docker isn't available on the host right now."
          : "Failed to load containers — the machine may be offline."}
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-2 py-10 text-center text-slate-500">
        <Box className="h-8 w-8 text-slate-300" />
        <p className="text-small">No running containers.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {data.map((c) => (
        <ContainerCard key={c.id} container={c} />
      ))}
    </div>
  );
}
