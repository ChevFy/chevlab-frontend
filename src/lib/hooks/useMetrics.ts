"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api/client";
import { endpoints } from "@/lib/api/metrics";
import type { Metrics, MetricPoint, HistoryRange, SystemStatus } from "@/types";

/** Live metrics — auto-refresh every 5s. */
export function useMetrics() {
  return useSWR<Metrics>(endpoints.metrics, fetcher, {
    refreshInterval: 5000,
  });
}

/** Online/offline status. */
export function useStatus() {
  return useSWR<SystemStatus>(endpoints.status, fetcher, {
    refreshInterval: 10000,
  });
}

/** History graph data for a range. */
export function useHistory(range: HistoryRange) {
  return useSWR<MetricPoint[]>(endpoints.history(range), fetcher);
}
