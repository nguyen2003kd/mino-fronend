"use client";

import Image from "next/image";
import { useState } from "react";
import { DotsThreeOutlineVerticalIcon, PlusIcon } from "@phosphor-icons/react";

const initialProducts = [
  { id: "amino-h2o", name: "Amino H2O", category: "Hydration", price: "$39.99", inventory: 145, status: "Đang bán", image: "/AminoH2ODesktop.png" },
  { id: "tb-500", name: "TB-500", category: "Research peptide", price: "$49.99", inventory: 82, status: "Đang bán", image: "/amino/TB500Desktop.webp" },
  { id: "nad-spray", name: "NAD+ Nasal Spray", category: "Spray", price: "$59.99", inventory: 24, status: "Đang bán", image: "/amino/NAD-Spray.png" },
  { id: "bpc-157", name: "BPC-157", category: "Research peptide", price: "$52.99", inventory: 0, status: "Tạm ẩn", image: "/BPC157Desktop.webp" },
];

export function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [notice, setNotice] = useState("Dữ liệu demo · chưa kết nối backend");

  function toggleProduct(productId: string) {
    setProducts((current) => current.map((product) => product.id === productId ? { ...product, status: product.status === "Đang bán" ? "Tạm ẩn" : "Đang bán" } : product));
    setNotice("Trạng thái sản phẩm đã cập nhật trong dữ liệu mock");
  }

  return (
    <>
      <p className="mt-5 rounded-xl border border-[#d3e3db] bg-[#edf7f1] px-4 py-3 text-sm text-[#285947]">{notice}</p>
      <section className="mt-7 overflow-hidden rounded-3xl border border-black/8 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/8 p-5 sm:p-6"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">Catalog</p><h2 className="mt-1 text-xl font-semibold">Sản phẩm</h2></div><button type="button" onClick={() => setNotice("Thao tác thêm sản phẩm sẽ được nối API ở phiên bản backend")} className="inline-flex items-center gap-2 rounded-xl bg-[#142426] px-4 py-2.5 text-sm font-bold text-white"><PlusIcon size={17} weight="bold" />Thêm sản phẩm</button></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[690px] text-left"><thead className="bg-[#fafbfa] text-[11px] font-bold uppercase tracking-[.12em] text-black/40"><tr><th className="px-6 py-3">Sản phẩm</th><th className="px-4 py-3">Danh mục</th><th className="px-4 py-3">Giá</th><th className="px-4 py-3">Kho</th><th className="px-4 py-3">Trạng thái</th><th className="px-6 py-3" /></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-t border-black/6 text-sm"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[#f3f6f4]"><Image src={product.image} alt="" fill sizes="40px" className="object-contain p-1" /></div><span className="font-semibold">{product.name}</span></div></td><td className="px-4 py-4 text-black/50">{product.category}</td><td className="px-4 py-4 font-semibold">{product.price}</td><td className="px-4 py-4"><span className={product.inventory === 0 ? "font-semibold text-[#9a3030]" : "text-black/65"}>{product.inventory === 0 ? "Hết hàng" : `${product.inventory} units`}</span></td><td className="px-4 py-4"><button type="button" onClick={() => toggleProduct(product.id)} className={`rounded-full px-2.5 py-1 text-xs font-bold ${product.status === "Đang bán" ? "bg-[#e0f3e7] text-[#25724c]" : "bg-[#f1eceb] text-[#7d4c44]"}`}>{product.status}</button></td><td className="px-6 py-4 text-right"><button type="button" onClick={() => setNotice(`${product.name}: menu thao tác (mock)`)} className="rounded-md p-1.5 text-black/40 hover:bg-black/5" aria-label={`Thao tác với ${product.name}`}><DotsThreeOutlineVerticalIcon size={19} weight="bold" /></button></td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}
