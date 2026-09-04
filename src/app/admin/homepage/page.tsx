import type { Metadata } from "next";

import { HomepageEditor } from "@/features/admin/homepage/components/homepage-editor";

export const metadata: Metadata = {
  title: "Homepage editor | MINO club",
  description: "Edit and preview the MINO club homepage.",
};

export default function HomepageEditorPage() {
  return <HomepageEditor />;
}
