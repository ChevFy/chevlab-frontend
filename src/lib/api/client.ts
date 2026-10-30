import axios from "axios";

/**
 * Shared axios instance. Base URL from env, falls back to local backend.
 * Set NEXT_PUBLIC_API_URL in .env.local to point at chevlab-backend.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  withCredentials: true,
});

/** SWR fetcher — GET a path, return the data. */
export const fetcher = <T>(url: string): Promise<T> =>
  api.get<T>(url).then((res) => res.data);
