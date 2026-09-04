import type { ReactNode } from "react";

import GuestGuard from "@/auth/GuestGuard";
import FallbackSpinner from "@/components/ui/loading";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <GuestGuard fallback={<FallbackSpinner message="Đang kiểm tra phiên đăng nhập" />}>
      {children}
    </GuestGuard>
  );
}
