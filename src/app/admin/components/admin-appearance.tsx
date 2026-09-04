"use client";

import { useState } from "react";
import { PaletteIcon } from "@phosphor-icons/react";

const initialTheme = { brand: "#6b0e36", ink: "#071d35", background: "#f5f8f7", surface: "#ffffff", accent: "#c8e8d7", sale: "#8b1249" };
type ThemeKey = keyof typeof initialTheme;

const colors: [ThemeKey, string][] = [["brand", "Brand maroon"], ["ink", "Text / ink"], ["background", "Page background"], ["surface", "Surface"], ["accent", "Soft accent"], ["sale", "Sale strip"]];

export function AdminAppearance() {
  const [theme, setTheme] = useState(initialTheme);
  const [notice, setNotice] = useState("Bản nháp chỉ lưu trong trình duyệt này");

  function updateTheme(key: ThemeKey, value: string) {
    const next = { ...theme, [key]: value };
    setTheme(next);
    window.localStorage.setItem("mino-admin-theme-draft", JSON.stringify(next));
    setNotice("Đã lưu bản nháp màu sắc trên trình duyệt này");
  }

  return (
    <>
      <p className="mt-5 rounded-xl border border-[#d3e3db] bg-[#edf7f1] px-4 py-3 text-sm text-[#285947]">{notice}</p>
      <section className="mt-7 max-w-2xl rounded-3xl border border-black/8 bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/40">Theme editor</p><h2 className="mt-1 text-xl font-semibold">Màu giao diện</h2></div><PaletteIcon size={22} className="text-[#6b0e36]" weight="fill" /></div><p className="mt-2 text-sm leading-5 text-black/50">Sau này phần này sẽ được thay bằng dữ liệu từ admin API.</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-black/8" style={{ background: theme.background }}><div className="p-4" style={{ background: theme.brand, color: theme.surface }}><p className="text-xs font-bold uppercase tracking-[.14em] opacity-70">MINO club</p><p className="mt-1 font-semibold">Preview sale strip</p></div><div className="p-4"><p className="text-lg font-semibold" style={{ color: theme.ink }}>Everyday, elevated.</p><span className="mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: theme.accent, color: theme.ink }}>Shop collection</span></div></div>
        <div className="mt-5 space-y-3">{colors.map(([key, label]) => <label key={key} className="flex items-center justify-between gap-3 rounded-xl border border-black/7 px-3 py-2.5"><span className="text-sm font-medium">{label}</span><span className="flex items-center gap-2"><span className="font-mono text-[11px] text-black/40">{theme[key]}</span><input aria-label={label} type="color" value={theme[key]} onChange={(event) => updateTheme(key, event.target.value)} className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0" /></span></label>)}</div>
        <button type="button" onClick={() => { setTheme(initialTheme); window.localStorage.removeItem("mino-admin-theme-draft"); setNotice("Đã khôi phục bảng màu mặc định"); }} className="mt-5 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-bold">Khôi phục</button>
      </section>
    </>
  );
}
