/** Shared API types. Mirror chevlab-backend schemas. */

export interface Metrics {
  cpu: number; // percent
  ram: number; // percent
  disk: number; // percent
  temperature: number; // celsius
  uptime: number; // seconds
  timestamp: string; // ISO
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export type HistoryRange = "1h" | "24h";

export interface SystemStatus {
  online: boolean;
  lastSeen: string; // ISO
}
