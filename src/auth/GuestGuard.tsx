"use client";
import useAuthStore from "@stores/auth";
import { useRouter } from "next/navigation";
import { type ReactElement, type ReactNode, useEffect } from "react";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const router = useRouter();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const accessToken = useAuthStore((state) => state.access_token);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isAuthenticated = isSignedIn && Boolean(accessToken);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.push("/");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || isAuthenticated) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
