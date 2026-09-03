"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  BellIcon,
  CaretDownIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  ClockIcon,
  DotsThreeOutlineVerticalIcon,
  GearSixIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PaletteIcon,
  PlusIcon,
  ShoppingBagIcon,
  SquaresFourIcon,
  TrendUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

const navigation = [
  { id: "overview", label: "Tổng quan", icon: SquaresFourIcon },
  { id: "orders", label: "Đơn hàng", icon: ShoppingBagIcon, count: "12" },
  { id: "products", label: "Sản phẩm", icon: PackageIcon },
  { id: "customers", label: "Khách hàng", icon: UsersThreeIcon },
  { id: "appearance", label: "Giao diện", icon: PaletteIcon },
] as const;

const initialProducts = [
  {
    id: "amino-h2o",
    name: "Amino H2O",
    category: "Hydration",
    price: "$39.99",
    inventory: 145,
    status: "Đang bán",
    image: "/AminoH2ODesktop.png",
  },
  {
    id: "tb-500",
    name: "TB-500",
    category: "Research peptide",
    price: "$49.99",
    inventory: 82,
    status: "Đang bán",
    image: "/amino/TB500Desktop.webp",
  },
  {
    id: "nad-spray",
    name: "NAD+ Nasal Spray",
    category: "Spray",
    price: "$59.99",
    inventory: 24,
    status: "Đang bán",
    image: "/amino/NAD-Spray.png",
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    category: "Research peptide",
    price: "$52.99",
    inventory: 0,
    status: "Tạm ẩn",
    image: "/BPC157Desktop.webp",
  },
];

const initialTheme = {
  brand: "#6b0e36",
  ink: "#071d35",
  background: "#f5f8f7",
  surface: "#ffffff",
  accent: "#c8e8d7",
  sale: "#8b1249",
};

type ThemeKey = keyof typeof initialTheme;
type Product = (typeof initialProducts)[number];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function AdminDashboard() {
  const [active, setActive] =
    useState<(typeof navigation)[number]["id"]>("overview");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [theme, setTheme] = useState(initialTheme);
  const [notice, setNotice] = useState("Dữ liệu demo · chưa kết nối backend");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeProducts = useMemo(
    () => products.filter((product) => product.status === "Đang bán").length,
    [products],
  );

  function updateTheme(key: ThemeKey, value: string) {
    const next = { ...theme, [key]: value };
    setTheme(next);
    window.localStorage.setItem("mino-admin-theme-draft", JSON.stringify(next));
    setNotice("Đã lưu bản nháp màu sắc trên trình duyệt này");
  }

  function toggleProduct(productId: string) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "Đang bán" ? "Tạm ẩn" : "Đang bán",
            }
          : product,
      ),
    );
    setNotice("Trạng thái sản phẩm đã cập nhật trong dữ liệu mock");
  }

  function selectNavigation(id: (typeof navigation)[number]["id"]) {
    setActive(id);
    setIsMenuOpen(false);
    setNotice(
      id === "overview"
        ? "Dữ liệu demo · chưa kết nối backend"
        : `Đang xem ${navigation.find((item) => item.id === id)?.label.toLowerCase()} (mock)`,
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f5f4] text-[#142426]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-black/8 bg-[#fbfbfa] p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 px-2 py-3"
            aria-label="Return to storefront"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#6b0e36] text-sm font-black tracking-[-.15em] text-white">
              M
            </span>
            <span>
              <strong className="block text-base tracking-tight">
                MINO club
              </strong>
              <small className="text-xs text-black/45">
                Store administration
              </small>
            </span>
          </Link>
          <nav className="mt-9 space-y-1" aria-label="Admin navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectNavigation(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${selected ? "bg-[#e8f2ed] text-[#153d30]" : "text-black/55 hover:bg-black/4 hover:text-black"}`}
                >
                  <Icon size={19} weight={selected ? "fill" : "regular"} />
                  <span className="flex-1">{item.label}</span>
                  {"count" in item && (
                    <span className="rounded-full bg-[#6b0e36] px-2 py-0.5 text-[10px] text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <Link
            href="/admin/homepage"
            className="mt-5 flex items-center justify-between rounded-xl border border-[#cfe0d7] bg-[#eef7f1] px-3 py-3 text-sm font-bold text-[#205440]"
          >
            <span className="flex items-center gap-2">
              <PaletteIcon size={18} weight="fill" />
              Chỉnh trang chủ
            </span>
            <ArrowUpRightIcon size={16} />
          </Link>
          <div className="mt-auto rounded-2xl bg-[#173c31] p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#b5d1c5]">
              Storefront
            </p>
            <p className="mt-2 text-sm font-semibold">Mở cửa · hoạt động tốt</p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#cfebdd] hover:text-white"
            >
              Xem cửa hàng <ArrowUpRightIcon size={14} />
            </Link>
          </div>
        </aside>

        {isMenuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <section className="min-w-0 flex-1 p-4 sm:p-7 lg:p-9">
          <header className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white lg:hidden"
                aria-label="Open menu"
              >
                <ListBulletsIcon size={20} />
              </button>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#687877]">
                  Admin / {navigation.find((item) => item.id === active)?.label}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Chào buổi sáng, Minh.
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 text-sm text-black/45 md:flex"
              >
                <MagnifyingGlassIcon size={17} />
                Tìm kiếm
              </button>
              <button
                type="button"
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white"
                aria-label="Notifications"
              >
                <BellIcon size={19} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#6b0e36]" />
              </button>
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-2.5 text-sm font-semibold"
              >
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#d9eee2] text-xs text-[#153d30]">
                  M
                </span>
                <span className="hidden sm:inline">Minh</span>
                <CaretDownIcon size={14} />
              </button>
            </div>
          </header>

          <p className="mt-5 rounded-xl border border-[#d3e3db] bg-[#edf7f1] px-4 py-3 text-sm text-[#285947]">
            {notice}
          </p>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Doanh thu tháng này"
              value={formatMoney(24890)}
              change="+18.6%"
              icon={ChartLineUpIcon}
              tone="bg-[#e5f1ec] text-[#1e5944]"
            />
            <Metric
              label="Đơn hàng mới"
              value="186"
              change="+12.4%"
              icon={ShoppingBagIcon}
              tone="bg-[#f8e9ee] text-[#8b1749]"
            />
            <Metric
              label="Khách hàng"
              value="3,842"
              change="+8.1%"
              icon={UsersThreeIcon}
              tone="bg-[#e9f0fb] text-[#315a91]"
            />
            <Metric
              label="Sản phẩm đang bán"
              value={`${activeProducts}/4`}
              change="Theo kho"
              icon={PackageIcon}
              tone="bg-[#fff1d9] text-[#956318]"
            />
          </section>

          <section className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
            <div className="rounded-3xl border border-black/8 bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">
                    Hiệu suất bán hàng
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Doanh thu 30 ngày gần nhất
                  </h2>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg bg-[#f3f5f4] px-3 py-2 text-xs font-bold"
                >
                  30 ngày <CaretDownIcon size={13} />
                </button>
              </div>
              <div
                className="mt-6 flex h-48 items-end gap-2"
                aria-label="Revenue bar chart"
              >
                {[38, 52, 41, 63, 58, 75, 69, 88, 72, 94, 83, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-75 ${index === 11 ? "bg-[#6b0e36]" : "bg-[#d9e9e1]"}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-3 flex justify-between text-[11px] font-medium text-black/40">
                <span>01 Jul</span>
                <span>08 Jul</span>
                <span>15 Jul</span>
                <span>22 Jul</span>
                <span>30 Jul</span>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-black/6 pt-4 text-sm">
                <TrendUpIcon
                  size={18}
                  className="text-[#2f8b60]"
                  weight="bold"
                />
                <span className="font-semibold">18.6% so với tháng trước</span>
                <span className="text-black/45">· xu hướng tăng ổn định</span>
              </div>
            </div>

            <div className="rounded-3xl border border-black/8 bg-[#173c31] p-5 text-white sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#b6d0c4]">
                    Hàng cần chú ý
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">Việc hôm nay</h2>
                </div>
                <ClockIcon size={22} className="text-[#d7eadf]" />
              </div>
              <div className="mt-6 space-y-3">
                <Task text="7 đơn chờ đóng gói" action="Xem đơn" />
                <Task
                  text="NAD+ Nasal Spray sắp hết hàng"
                  action="Cập nhật kho"
                />
                <Task text="2 đánh giá mới cần phản hồi" action="Mở inbox" />
              </div>
              <button
                type="button"
                onClick={() => selectNavigation("orders")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#173c31]"
              >
                Mở công việc <ArrowUpRightIcon size={16} />
              </button>
            </div>
          </section>

          <section className="mt-7 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-3xl border border-black/8 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/8 p-5 sm:p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">
                    Catalog
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Sản phẩm gần đây
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotice(
                      "Thao tác thêm sản phẩm sẽ được nối API ở phiên bản backend",
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-[#142426] px-4 py-2.5 text-sm font-bold text-white"
                >
                  <PlusIcon size={17} weight="bold" />
                  Thêm sản phẩm
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[690px] text-left">
                  <thead className="bg-[#fafbfa] text-[11px] font-bold uppercase tracking-[.12em] text-black/40">
                    <tr>
                      <th className="px-6 py-3">Sản phẩm</th>
                      <th className="px-4 py-3">Danh mục</th>
                      <th className="px-4 py-3">Giá</th>
                      <th className="px-4 py-3">Kho</th>
                      <th className="px-4 py-3">Trạng thái</th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-t border-black/6 text-sm"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[#f3f6f4]">
                              <Image
                                src={product.image}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-contain p-1"
                              />
                            </div>
                            <span className="font-semibold">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-black/50">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 font-semibold">
                          {product.price}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={
                              product.inventory === 0
                                ? "font-semibold text-[#9a3030]"
                                : "text-black/65"
                            }
                          >
                            {product.inventory === 0
                              ? "Hết hàng"
                              : `${product.inventory} units`}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => toggleProduct(product.id)}
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${product.status === "Đang bán" ? "bg-[#e0f3e7] text-[#25724c]" : "bg-[#f1eceb] text-[#7d4c44]"}`}
                          >
                            {product.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setNotice(`${product.name}: menu thao tác (mock)`)
                            }
                            className="rounded-md p-1.5 text-black/40 hover:bg-black/5"
                          >
                            <DotsThreeOutlineVerticalIcon
                              size={19}
                              weight="bold"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <AppearancePanel
              theme={theme}
              onChange={updateTheme}
              onReset={() => {
                setTheme(initialTheme);
                window.localStorage.removeItem("mino-admin-theme-draft");
                setNotice("Đã khôi phục bảng màu mặc định");
              }}
            />
          </section>
        </section>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  change,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof ChartLineUpIcon;
  tone: string;
}) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-black/50">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone}`}>
          <Icon size={19} weight="bold" />
        </span>
      </div>
      <p className="mt-6 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs font-semibold text-[#2f8b60]">
        <span className="mr-1">↗</span>
        {change}
      </p>
    </article>
  );
}

function Task({ text, action }: { text: string; action: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/12 bg-white/6 p-3">
      <CheckCircleIcon
        size={18}
        className="mt-0.5 shrink-0 text-[#b6d0c4]"
        weight="fill"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{text}</p>
        <button
          type="button"
          className="mt-1 text-xs font-bold text-[#b6d0c4] hover:text-white"
        >
          {action}
        </button>
      </div>
    </div>
  );
}

function AppearancePanel({
  theme,
  onChange,
  onReset,
}: {
  theme: typeof initialTheme;
  onChange: (key: ThemeKey, value: string) => void;
  onReset: () => void;
}) {
  return (
    <aside className="rounded-3xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">
            Theme editor
          </p>
          <h2 className="mt-1 text-xl font-semibold">Màu giao diện</h2>
        </div>
        <PaletteIcon size={22} className="text-[#6b0e36]" weight="fill" />
      </div>
      <p className="mt-2 text-sm leading-5 text-black/50">
        Bản nháp này chỉ lưu trong trình duyệt. Sau này sẽ thay bằng dữ liệu từ
        admin API.
      </p>
      <div
        className="mt-5 overflow-hidden rounded-2xl border border-black/8"
        style={{ background: theme.background }}
      >
        <div
          className="p-4"
          style={{ background: theme.brand, color: theme.surface }}
        >
          <p className="text-xs font-bold uppercase tracking-[.14em] opacity-70">
            MINO club
          </p>
          <p className="mt-1 font-semibold">Preview sale strip</p>
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold" style={{ color: theme.ink }}>
            Everyday, elevated.
          </p>
          <span
            className="mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: theme.accent, color: theme.ink }}
          >
            Shop collection
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {(
          [
            ["brand", "Brand maroon"],
            ["ink", "Text / ink"],
            ["background", "Page background"],
            ["surface", "Surface"],
            ["accent", "Soft accent"],
            ["sale", "Sale strip"],
          ] as [ThemeKey, string][]
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/7 px-3 py-2.5"
          >
            <span className="text-sm font-medium">{label}</span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-black/40">
                {theme[key]}
              </span>
              <input
                aria-label={label}
                type="color"
                value={theme[key]}
                onChange={(event) => onChange(key, event.target.value)}
                className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
              />
            </span>
          </label>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-xl border border-black/10 py-2.5 text-sm font-bold"
        >
          Khôi phục
        </button>
        <button
          type="button"
          onClick={() =>
            window.alert("Mock only: bản nháp đã được lưu trong localStorage.")
          }
          className="flex-1 rounded-xl bg-[#142426] py-2.5 text-sm font-bold text-white"
        >
          Lưu bản nháp
        </button>
      </div>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-bold text-black/55 hover:text-black"
      >
        <GearSixIcon size={17} />
        Cài đặt nâng cao
      </button>
    </aside>
  );
}
