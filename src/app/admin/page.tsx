import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin | MINO club",
  description: "Mock administration dashboard for MINO club.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
