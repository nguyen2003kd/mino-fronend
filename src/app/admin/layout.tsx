"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/auth/AuthGuard";
import { AdminShell } from "@/app/admin/components/admin-shell";
import FallbackSpinner from "@/components/ui/loading";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepageEditor = pathname === "/admin/homepage";

  return (
    <AuthGuard fallback={<FallbackSpinner />}>
      {isHomepageEditor ? children : <AdminShell>{children}</AdminShell>}
    </AuthGuard>
  );
}
