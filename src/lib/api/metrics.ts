import { api } from "./client";
import type { Metrics, MetricPoint, HistoryRange, SystemStatus } from "@/types";

/** API endpoint paths — single source of truth for SWR keys. */
export const endpoints = {
  metrics: "/api/metrics",
  status: "/api/status",
  history: (range: HistoryRange) => `/api/metrics/history?range=${range}`,
} as const;

/** Imperative calls (use SWR hooks for components). */
export const getMetrics = () =>
  api.get<Metrics>(endpoints.metrics).then((r) => r.data);

export const getStatus = () =>
  api.get<SystemStatus>(endpoints.status).then((r) => r.data);

export const getHistory = (range: HistoryRange) =>
  api.get<MetricPoint[]>(endpoints.history(range)).then((r) => r.data);
