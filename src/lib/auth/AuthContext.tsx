"use client";

import { createContext, useContext, useSyncExternalStore, useCallback } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  setToken,
  setGuest,
  clearSession,
} from "./token";

type AuthState = {
  ready: boolean; // true once hydrated on the client
  isAuthed: boolean; // logged in with a token
  isGuest: boolean; // browsing as guest
  signIn: (token: string) => void;
  continueAsGuest: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const noopSubscribe = () => () => {};

/** false during SSR + first hydration render, true afterwards — no setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useMounted();

  const signIn = useCallback((token: string) => setToken(token), []);
  const continueAsGuest = useCallback(() => setGuest(), []);
  const signOut = useCallback(() => clearSession(), []);

  return (
    <AuthContext.Provider
      value={{
        ready,
        isAuthed: !!session.token,
        isGuest: session.guest,
        signIn,
        continueAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
