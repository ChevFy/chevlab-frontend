/**
 * Auth session store backed by localStorage, exposed as an external store
 * (subscribe/getSnapshot) so React can read it via useSyncExternalStore
 * without setState-in-effect. Browser-only; SSR sees the empty snapshot.
 */

const TOKEN_KEY = "chevlab_token";
const GUEST_KEY = "chevlab_guest";

export type Session = { token: string | null; guest: boolean };

const SERVER_SNAPSHOT: Session = { token: null, guest: false };

const listeners = new Set<() => void>();
let cache: Session = SERVER_SNAPSHOT;

function read(): Session {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  return {
    token: window.localStorage.getItem(TOKEN_KEY),
    guest: window.localStorage.getItem(GUEST_KEY) === "true",
  };
}

/** Refresh the cached snapshot; keep the same object ref when unchanged. */
function refresh(): void {
  const next = read();
  if (next.token !== cache.token || next.guest !== cache.guest) {
    cache = next;
  }
}

function emit(): void {
  refresh();
  listeners.forEach((l) => l());
}

export function subscribe(cb: () => void): () => void {
  // Attach the cross-tab listener only once, on the first subscriber, and
  // detach it only when the last one leaves — so one unsubscribe can't strip
  // the shared listener out from under the others.
  if (listeners.size === 0 && typeof window !== "undefined") {
    window.addEventListener("storage", emit);
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", emit);
    }
  };
}

export function getSnapshot(): Session {
  refresh();
  return cache;
}

export function getServerSnapshot(): Session {
  return SERVER_SNAPSHOT;
}

// ── mutations ──

export function getToken(): string | null {
  return read().token;
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.removeItem(GUEST_KEY);
  emit();
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  emit();
}

export function setGuest(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GUEST_KEY, "true");
  window.localStorage.removeItem(TOKEN_KEY);
  emit();
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(GUEST_KEY);
  emit();
}
