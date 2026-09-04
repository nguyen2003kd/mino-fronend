"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRightIcon,
  BellIcon,
  CaretDownIcon,
  ListBulletsIcon,
  PackageIcon,
  PaletteIcon,
  ShoppingBagIcon,
  SquaresFourIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

const navigation = [
  { href: "/admin", label: "Tổng quan", icon: SquaresFourIcon },
  { href: "/admin/orders", label: "Đơn hàng", icon: ShoppingBagIcon, count: "12" },
  { href: "/admin/products", label: "Sản phẩm", icon: PackageIcon },
  { href: "/admin/customers", label: "Khách hàng", icon: UsersThreeIcon },
  { href: "/admin/appearance", label: "Giao diện", icon: PaletteIcon },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPage = navigation.find((item) => item.href === pathname) ?? navigation[0];

  return (
    <div className="min-h-screen bg-[#f4f5f4] text-[#142426]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-black/8 bg-[#fbfbfa] p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
        >
          <Link href="/" className="flex items-center gap-3 px-2 py-3" aria-label="Return to storefront">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#6b0e36] text-sm font-black tracking-[-.15em] text-white">M</span>
            <span>
              <strong className="block text-base tracking-tight">MINO club</strong>
              <small className="text-xs text-black/45">Store administration</small>
            </span>
          </Link>

          <nav className="mt-9 space-y-1" aria-label="Admin navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const selected = currentPage.href === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${selected ? "bg-[#e8f2ed] text-[#153d30]" : "text-black/55 hover:bg-black/4 hover:text-black"}`}
                >
                  <Icon size={19} weight={selected ? "fill" : "regular"} />
                  <span className="flex-1">{item.label}</span>
                  {"count" in item && <span className="rounded-full bg-[#6b0e36] px-2 py-0.5 text-[10px] text-white">{item.count}</span>}
                </Link>
              );
            })}
          </nav>

          <Link href="/admin/homepage" className="mt-5 flex items-center justify-between rounded-xl border border-[#cfe0d7] bg-[#eef7f1] px-3 py-3 text-sm font-bold text-[#205440]">
            <span className="flex items-center gap-2"><PaletteIcon size={18} weight="fill" />Chỉnh trang chủ</span>
            <ArrowUpRightIcon size={16} />
          </Link>

          <div className="mt-auto rounded-2xl bg-[#173c31] p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#b5d1c5]">Storefront</p>
            <p className="mt-2 text-sm font-semibold">Mở cửa · hoạt động tốt</p>
            <Link href="/" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#cfebdd] hover:text-white">
              Xem cửa hàng <ArrowUpRightIcon size={14} />
            </Link>
          </div>
        </aside>

        {isMenuOpen && <button type="button" className="fixed inset-0 z-20 bg-black/20 lg:hidden" aria-label="Close menu" onClick={() => setIsMenuOpen(false)} />}

        <main className="min-w-0 flex-1 p-4 sm:p-7 lg:p-9">
          <header className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setIsMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white lg:hidden" aria-label="Open menu">
                <ListBulletsIcon size={20} />
              </button>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#687877]">Admin / {currentPage.label}</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{currentPage.label}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white" aria-label="Notifications">
                <BellIcon size={19} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#6b0e36]" />
              </button>
              <button type="button" className="flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-2.5 text-sm font-semibold">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#d9eee2] text-xs text-[#153d30]">M</span>
                <span className="hidden sm:inline">Minh</span>
                <CaretDownIcon size={14} />
              </button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
