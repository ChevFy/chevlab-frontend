import axios from "axios";
import { getToken, clearToken } from "@/lib/auth/token";

/**
 * Shared axios instance. Calls are same-origin (/api/*) and proxied to the
 * backend by Next rewrites (see next.config.ts) — avoids CORS in the browser.
 *
 * Backend uses JWT Bearer auth (not cookies) — token is attached per request
 * via the interceptor below. Token lives 1h; a 401 clears it and bounces to login.
 */
export const api = axios.create({
  baseURL: "",
});

// Attach Bearer token on every request (if present).
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401 (expired/invalid token), clear it and send the user to login.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Only bounce to login if a token actually expired — guests on public
      // pages (dashboard/history) must not be dragged off on a stray 401.
      const hadToken = !!getToken();
      clearToken();
      if (hadToken && window.location.pathname !== "/login") {
        // Hard redirect: this interceptor runs outside React, so useRouter/redirect
        // aren't available here.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

/** SWR fetcher — GET a path, return the data. */
export const fetcher = <T>(url: string): Promise<T> =>
  api.get<T>(url).then((res) => res.data);
