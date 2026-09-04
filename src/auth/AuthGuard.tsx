"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useAuthStore from "@/stores/auth";

type AuthGuardProps = {
  children: ReactNode;
  fallback: ReactNode;
};

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const accessToken = useAuthStore((state) => state.access_token);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isAuthenticated = isSignedIn && Boolean(accessToken);

  useEffect(() => {
    if (!hasHydrated || isAuthenticated) {
      return;
    }

    const returnUrl = pathname ?? "/admin";
    router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }, [hasHydrated, isAuthenticated, pathname, router]);

  if (!hasHydrated || !isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
