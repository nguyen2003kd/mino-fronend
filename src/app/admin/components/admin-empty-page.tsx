"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export function AdminEmptyPage({ title, description, action }: { title: string; description: string; action: { label: string; href: string } }) {
  return (
    <section className="mt-7 max-w-2xl rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">Dữ liệu demo</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-xl leading-6 text-black/55">{description}</p>
      <Link href={action.href} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#142426] px-4 py-2.5 text-sm font-bold text-white">{action.label}<ArrowUpRightIcon size={16} /></Link>
    </section>
  );
}
