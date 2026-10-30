import { api } from "./client";
import type {
  SystemInfo,
  LatestMetric,
  HistoryPoint,
  Container,
  LoginRequest,
  TokenResponse,
} from "@/types";

/** API endpoint paths — single source of truth for SWR keys. */
export const endpoints = {
  info: "/api/info",
  latest: "/api/latest",
  history: (hours: number) => `/api/history?hours=${hours}`,
  containers: "/api/containers",
  login: "/api/login",
} as const;

export const getInfo = () =>
  api.get<SystemInfo>(endpoints.info).then((r) => r.data);

export const getLatest = () =>
  api.get<LatestMetric>(endpoints.latest).then((r) => r.data);

export const getHistory = (hours: number) =>
  api.get<HistoryPoint[]>(endpoints.history(hours)).then((r) => r.data);

export const getContainers = () =>
  api.get<Container[]>(endpoints.containers).then((r) => r.data);

export const login = (body: LoginRequest) =>
  api.post<TokenResponse>(endpoints.login, body).then((r) => r.data);
