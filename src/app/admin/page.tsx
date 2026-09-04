import type { Metadata } from "next";

import { AdminOverview } from "@/app/admin/components/admin-overview";

export const metadata: Metadata = {
  title: "Admin | MINO club",
  description: "Mock administration dashboard for MINO club.",
};

export default function AdminPage() {
  return <AdminOverview />;
}
