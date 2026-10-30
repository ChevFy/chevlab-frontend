"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/client";
import { endpoints } from "@/lib/api/system";
import type { SystemInfo, LatestMetric, HistoryPoint, Container } from "@/types";

/** Static host info — fetch once, no polling. */
export function useInfo() {
  return useSWR<SystemInfo>(endpoints.info, fetcher, {
    revalidateOnFocus: false,
  });
}

/** Latest metric snapshot — auto-refresh every 5s. */
export function useLatest() {
  return useSWR<LatestMetric>(endpoints.latest, fetcher, {
    refreshInterval: 5000,
  });
}

/** Metric history for the last N hours — refresh every 30s. */
export function useHistory(hours: number) {
  return useSWR<HistoryPoint[]>(endpoints.history(hours), fetcher, {
    refreshInterval: 30000,
  });
}

/** Running Docker containers (private) — refresh every 10s. */
export function useContainers() {
  return useSWR<Container[]>(endpoints.containers, fetcher, {
    refreshInterval: 10000,
  });
}
