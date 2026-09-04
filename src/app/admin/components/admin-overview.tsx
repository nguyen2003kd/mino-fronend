"use client";

import Link from "next/link";
import {
  ArrowUpRightIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  ClockIcon,
  PackageIcon,
  ShoppingBagIcon,
  TrendUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

const metrics = [
  { label: "Doanh thu tháng này", value: "$24,890", change: "+18.6%", icon: ChartLineUpIcon, tone: "bg-[#e5f1ec] text-[#1e5944]" },
  { label: "Đơn hàng mới", value: "186", change: "+12.4%", icon: ShoppingBagIcon, tone: "bg-[#f8e9ee] text-[#8b1749]" },
  { label: "Khách hàng", value: "3,842", change: "+8.1%", icon: UsersThreeIcon, tone: "bg-[#e9f0fb] text-[#315a91]" },
  { label: "Sản phẩm đang bán", value: "3/4", change: "Theo kho", icon: PackageIcon, tone: "bg-[#fff1d9] text-[#956318]" },
] as const;

export function AdminOverview() {
  return (
    <>
      <p className="mt-5 rounded-xl border border-[#d3e3db] bg-[#edf7f1] px-4 py-3 text-sm text-[#285947]">Dữ liệu demo · chưa kết nối backend</p>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, icon: Icon, tone }) => (
          <article key={label} className="rounded-2xl border border-black/8 bg-white p-5">
            <div className="flex items-start justify-between"><p className="text-sm font-medium text-black/50">{label}</p><span className={`grid h-9 w-9 place-items-center rounded-xl ${tone}`}><Icon size={19} weight="bold" /></span></div>
            <p className="mt-6 text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-2 text-xs font-semibold text-[#2f8b60]">↗ {change}</p>
          </article>
        ))}
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
        <div className="rounded-3xl border border-black/8 bg-white p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">Hiệu suất bán hàng</p>
          <h2 className="mt-1 text-xl font-semibold">Doanh thu 30 ngày gần nhất</h2>
          <div className="mt-6 flex h-48 items-end gap-2" aria-label="Revenue bar chart">
            {[38, 52, 41, 63, 58, 75, 69, 88, 72, 94, 83, 100].map((height, index) => <div key={height} className="flex h-full flex-1 items-end"><div className={`w-full rounded-t-md ${index === 11 ? "bg-[#6b0e36]" : "bg-[#d9e9e1]"}`} style={{ height: `${height}%` }} /></div>)}
          </div>
          <div className="mt-6 flex items-center gap-2 border-t border-black/6 pt-4 text-sm"><TrendUpIcon size={18} className="text-[#2f8b60]" weight="bold" /><span className="font-semibold">18.6% so với tháng trước</span></div>
        </div>

        <div className="rounded-3xl border border-black/8 bg-[#173c31] p-5 text-white sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#b6d0c4]">Hàng cần chú ý</p><h2 className="mt-1 text-xl font-semibold">Việc hôm nay</h2></div><ClockIcon size={22} className="text-[#d7eadf]" /></div>
          <div className="mt-6 space-y-3">{["7 đơn chờ đóng gói", "NAD+ Nasal Spray sắp hết hàng", "2 đánh giá mới cần phản hồi"].map((task) => <div key={task} className="flex gap-3 rounded-xl border border-white/12 bg-white/6 p-3"><CheckCircleIcon size={18} className="mt-0.5 shrink-0 text-[#b6d0c4]" weight="fill" /><p className="text-sm font-semibold">{task}</p></div>)}</div>
          <Link href="/admin/orders" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#173c31]">Mở đơn hàng <ArrowUpRightIcon size={16} /></Link>
        </div>
      </section>
    </>
  );
}
