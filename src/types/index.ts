/** Shared API types. Mirror chevlab-backend schemas (verified against :8000). */

/** GET /api/info — static host info. */
export interface SystemInfo {
  hostname: string;
  os_name: string;
  os_release: string;
  cpu_model: string;
  cpu_cores: number;
  cpu_threads: number;
  memory_total: number; // bytes
  boot_time: string; // ISO
}

/** GET /api/latest — most recent metric snapshot. */
export interface LatestMetric {
  id: number;
  cpu_percent: number;
  memory_percent: number;
  swap_percent: number;
  disk_percent: number;
  net_recv_bytes_per_sec: number;
  net_sent_bytes_per_sec: number;
  cpu_temp: number | null;
  timestamp: string; // ISO
}

/** GET /api/history?hours=N — ordered list of snapshots (same shape as latest). */
export type HistoryPoint = LatestMetric;

/** Docker port binding (host side). */
export interface PortBinding {
  HostIp: string;
  HostPort: string;
}

/** GET /api/containers — a running Docker container (private). */
export interface Container {
  id: string;
  name: string;
  image: string;
  status: string; // running | exited | paused | ...
  health: string | null; // healthy | unhealthy | starting | null
  started_at: string; // ISO
  ports: Record<string, PortBinding[] | null> | null;
}

/** POST /api/login body. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** POST /api/login response. */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}
