"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowCounterClockwiseIcon,
  ArrowSquareOutIcon,
  CaretDownIcon,
  CheckCircleIcon,
  DesktopIcon,
  DeviceMobileIcon,
  EyeIcon,
  FloppyDiskIcon,
  ImageIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";

const productImages = [
  { label: "Amino H2O", value: "/AminoH2ODesktop.png" },
  { label: "TB-500", value: "/amino/TB500Desktop.webp" },
  { label: "NAD+ Nasal Spray", value: "/amino/NAD-Spray.png" },
  { label: "BPC-157", value: "/BPC157Desktop.webp" },
];

const initialDraft = {
  heroTitle: "Research Peptides\nYou Can Trust",
  heroDescription: "Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, third-party tested.",
  heroCta: "Browse Catalog",
  heroImage: "/AminoH2ODesktop.png",
  heroBackground: "#eff0ff",
  saleBackground: "#6b0e36",
  guaranteeTitle: "The Amino Club Guarantee",
  guaranteeDescription: "Documented quality for research and laboratory use. Every batch meets our internal purity standards.",
  guaranteeImage: "/amino/NADDesktop.webp",
  guaranteeBackground: "#f0edff",
  guaranteePresentation: "contained" as "contained" | "directional-crop",
  guaranteeCardOneTitle: "99% Purity Guaranteed",
  guaranteeCardOneDetail: "Every batch verified",
  guaranteeCardOneColor: "#dcf9d9",
  guaranteeCardTwoTitle: "Shipment Protection",
  guaranteeCardTwoDetail: "Every order fully covered",
  guaranteeCardTwoColor: "#d8eaff",
  guaranteeCardThreeTitle: "CoA with Every Batch",
  guaranteeCardThreeDetail: "Third-party test record",
  guaranteeCardThreeColor: "#fff6c9",
  subscriptionTitle: "Pick any 4. Save 40% every month.",
  subscriptionDescription: "Build a repeating box from the catalog, with predictable monthly savings and room to swap items before the next order.",
  subscriptionCta: "Build your box",
  subscriptionBackground: "#f8fff0",
  bulkTitle: "Stocking up? Up to 50% off in bulk.",
  bulkDescription: "Ten units unlock deeper pricing; larger research orders receive the strongest price tier.",
  bulkCta: "Order in bulk",
  bulkBackground: "#e6f6ef",
  clubTitle: "Run a tab.",
  clubDescription: "Split an eligible order into four scheduled payments. The order dispatches now; there are no interest charges shown at checkout.",
  clubCta: "Become a member",
  clubBackground: "#191611",
  bundlesTitle: "Good research travels by link.",
  bundlesDescription: "Load several products onto one ticket and share it with the people placing an order alongside you.",
  bundlesBackground: "#edf9ff",
  creditTitle: "Load points once. We add up to 25% on top.",
  creditBackground: "#f8f4ea",
  successTitle: "Everything you need to succeed",
  successBackground: "#e6ffe0",
  qualityTitle: "Quality you can verify, not just trust",
  qualityDescription: "Each batch is reviewed against a repeatable quality process before release.",
  faqTitle: "Frequently Asked Questions",
  faqDescription: "Everything you need to know about peptide research",
  footerCta: "All the research peptides you need, with the peace of mind and research community at your fingertips.",
  footerBackground: "#091c34",
};

type Draft = typeof initialDraft;
type Viewport = "desktop" | "mobile";

export function HomepageEditor() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [notice, setNotice] = useState("Bạn đang chỉnh bản nháp. Chưa có dữ liệu nào được publish.");

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setNotice("Preview đã cập nhật · nhấn Lưu bản nháp để giữ dữ liệu mock");
  }

  function saveDraft() {
    window.localStorage.setItem("mino-homepage-draft", JSON.stringify(draft));
    setNotice("Đã lưu bản nháp vào trình duyệt này. Khi có backend, hành động này sẽ gọi API publish.");
  }

  function resetDraft() {
    setDraft(initialDraft);
    window.localStorage.removeItem("mino-homepage-draft");
    setNotice("Đã khôi phục nội dung mẫu.");
  }

  return (
    <main className="min-h-screen bg-[#edf0ef] text-[#142426]">
      <header className="sticky top-0 z-30 border-b border-black/8 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="grid h-10 w-10 place-items-center rounded-xl bg-[#6b0e36] text-sm font-black tracking-[-.14em] text-white">M</Link>
            <div><p className="text-xs font-bold uppercase tracking-[.15em] text-black/45">Admin / Content</p><h1 className="text-lg font-semibold tracking-tight">Homepage editor</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="hidden items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-bold sm:inline-flex">Mở trang chủ <ArrowSquareOutIcon size={16} /></Link>
            <button type="button" onClick={resetDraft} className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white" aria-label="Reset draft"><ArrowCounterClockwiseIcon size={18} /></button>
            <button type="button" onClick={saveDraft} className="inline-flex items-center gap-2 rounded-xl bg-[#173c31] px-4 py-2.5 text-sm font-bold text-white"><FloppyDiskIcon size={17} weight="bold" />Lưu bản nháp</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-5 p-4 lg:grid-cols-[370px_minmax(0,1fr)] lg:p-6">
        <aside className="self-start rounded-2xl border border-black/8 bg-white p-4 lg:sticky lg:top-20">
          <div className="rounded-xl border border-[#d2e8dc] bg-[#eff9f3] px-3 py-2.5 text-xs leading-5 text-[#295b47]">{notice}</div>
          <EditorSection icon={PencilSimpleIcon} title="Hero">
            <Field label="Tiêu đề"><textarea value={draft.heroTitle} onChange={(event) => update("heroTitle", event.target.value)} rows={3} /></Field>
            <Field label="Mô tả"><textarea value={draft.heroDescription} onChange={(event) => update("heroDescription", event.target.value)} rows={4} /></Field>
            <Field label="Nhãn nút CTA"><input value={draft.heroCta} onChange={(event) => update("heroCta", event.target.value)} /></Field>
            <SelectImage label="Ảnh hero" value={draft.heroImage} onChange={(value) => update("heroImage", value)} />
            <ColorField label="Nền hero" value={draft.heroBackground} onChange={(value) => update("heroBackground", value)} />
          </EditorSection>

          <EditorSection icon={ImageIcon} title="Guarantee">
            <Field label="Tiêu đề"><input value={draft.guaranteeTitle} onChange={(event) => update("guaranteeTitle", event.target.value)} /></Field>
            <Field label="Mô tả"><textarea value={draft.guaranteeDescription} onChange={(event) => update("guaranteeDescription", event.target.value)} rows={3} /></Field>
            <SelectImage label="Ảnh Guarantee" value={draft.guaranteeImage} onChange={(value) => update("guaranteeImage", value)} />
            <ColorField label="Nền ảnh" value={draft.guaranteeBackground} onChange={(value) => update("guaranteeBackground", value)} />
            <label className="grid gap-1.5 text-xs font-bold text-black/55">Cách đặt ảnh<select value={draft.guaranteePresentation} onChange={(event) => update("guaranteePresentation", event.target.value as Draft["guaranteePresentation"])}><option value="contained">Bình thường</option><option value="directional-crop">Crop lớn theo hướng</option></select></label>
            <GuaranteeCardFields number="01" title={draft.guaranteeCardOneTitle} detail={draft.guaranteeCardOneDetail} color={draft.guaranteeCardOneColor} onTitleChange={(value) => update("guaranteeCardOneTitle", value)} onDetailChange={(value) => update("guaranteeCardOneDetail", value)} onColorChange={(value) => update("guaranteeCardOneColor", value)} />
            <GuaranteeCardFields number="02" title={draft.guaranteeCardTwoTitle} detail={draft.guaranteeCardTwoDetail} color={draft.guaranteeCardTwoColor} onTitleChange={(value) => update("guaranteeCardTwoTitle", value)} onDetailChange={(value) => update("guaranteeCardTwoDetail", value)} onColorChange={(value) => update("guaranteeCardTwoColor", value)} />
            <GuaranteeCardFields number="03" title={draft.guaranteeCardThreeTitle} detail={draft.guaranteeCardThreeDetail} color={draft.guaranteeCardThreeColor} onTitleChange={(value) => update("guaranteeCardThreeTitle", value)} onDetailChange={(value) => update("guaranteeCardThreeDetail", value)} onColorChange={(value) => update("guaranteeCardThreeColor", value)} />
          </EditorSection>

          <EditorSection icon={EyeIcon} title="Thương hiệu">
            <ColorField label="Sale strip" value={draft.saleBackground} onChange={(value) => update("saleBackground", value)} />
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="Subscription box">
            <Field label="Tiêu đề"><textarea value={draft.subscriptionTitle} onChange={(event) => update("subscriptionTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả"><textarea value={draft.subscriptionDescription} onChange={(event) => update("subscriptionDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.subscriptionCta} onChange={(event) => update("subscriptionCta", event.target.value)} /></Field>
            <ColorField label="Nền section" value={draft.subscriptionBackground} onChange={(value) => update("subscriptionBackground", value)} />
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="Bulk orders">
            <Field label="Tiêu đề"><textarea value={draft.bulkTitle} onChange={(event) => update("bulkTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả"><textarea value={draft.bulkDescription} onChange={(event) => update("bulkDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.bulkCta} onChange={(event) => update("bulkCta", event.target.value)} /></Field>
            <ColorField label="Nền section" value={draft.bulkBackground} onChange={(value) => update("bulkBackground", value)} />
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="Club Tab">
            <Field label="Tiêu đề"><input value={draft.clubTitle} onChange={(event) => update("clubTitle", event.target.value)} /></Field>
            <Field label="Mô tả"><textarea value={draft.clubDescription} onChange={(event) => update("clubDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.clubCta} onChange={(event) => update("clubCta", event.target.value)} /></Field>
            <ColorField label="Nền section" value={draft.clubBackground} onChange={(value) => update("clubBackground", value)} />
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="Bundles & Credit">
            <Field label="Tiêu đề Bundles"><textarea value={draft.bundlesTitle} onChange={(event) => update("bundlesTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả Bundles"><textarea value={draft.bundlesDescription} onChange={(event) => update("bundlesDescription", event.target.value)} rows={3} /></Field>
            <ColorField label="Nền Bundles" value={draft.bundlesBackground} onChange={(value) => update("bundlesBackground", value)} />
            <Field label="Tiêu đề Credit"><textarea value={draft.creditTitle} onChange={(event) => update("creditTitle", event.target.value)} rows={2} /></Field>
            <ColorField label="Nền Credit" value={draft.creditBackground} onChange={(value) => update("creditBackground", value)} />
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="Success, Quality & FAQ">
            <Field label="Tiêu đề Success"><input value={draft.successTitle} onChange={(event) => update("successTitle", event.target.value)} /></Field>
            <ColorField label="Nền Success" value={draft.successBackground} onChange={(value) => update("successBackground", value)} />
            <Field label="Tiêu đề Quality"><textarea value={draft.qualityTitle} onChange={(event) => update("qualityTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả Quality"><textarea value={draft.qualityDescription} onChange={(event) => update("qualityDescription", event.target.value)} rows={2} /></Field>
            <Field label="Tiêu đề FAQ"><input value={draft.faqTitle} onChange={(event) => update("faqTitle", event.target.value)} /></Field>
            <Field label="Mô tả FAQ"><textarea value={draft.faqDescription} onChange={(event) => update("faqDescription", event.target.value)} rows={2} /></Field>
          </EditorSection>

          <EditorSection icon={PencilSimpleIcon} title="CTA & Footer">
            <Field label="Lời gọi hành động"><textarea value={draft.footerCta} onChange={(event) => update("footerCta", event.target.value)} rows={3} /></Field>
            <ColorField label="Nền Footer" value={draft.footerBackground} onChange={(value) => update("footerBackground", value)} />
          </EditorSection>
        </aside>

        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.15em] text-black/45">Live mock preview</p><h2 className="mt-1 text-xl font-semibold">Trang chủ sẽ hiển thị như thế này</h2></div>
            <div className="flex rounded-xl border border-black/10 bg-white p-1"><button type="button" onClick={() => setViewport("desktop")} className={"grid h-8 w-9 place-items-center rounded-lg " + (viewport === "desktop" ? "bg-[#173c31] text-white" : "text-black/45")} aria-label="Desktop preview"><DesktopIcon size={18} /></button><button type="button" onClick={() => setViewport("mobile")} className={"grid h-8 w-9 place-items-center rounded-lg " + (viewport === "mobile" ? "bg-[#173c31] text-white" : "text-black/45")} aria-label="Mobile preview"><DeviceMobileIcon size={18} /></button></div>
          </div>

          <div className="overflow-auto rounded-2xl border border-black/10 bg-[#d9dddc] p-3 sm:p-5">
            <div className={"mx-auto overflow-hidden bg-white shadow-[0_24px_60px_rgba(18,38,34,.18)] transition-all " + (viewport === "desktop" ? "w-full max-w-[1240px]" : "w-[390px] max-w-full")}>
              <HomepagePreview draft={draft} viewport={viewport} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HomepagePreview({ draft, viewport }: { draft: Draft; viewport: Viewport }) {
  const isMobile = viewport === "mobile";
  const title = draft.heroTitle.split("\n").map((line) => <span key={line} className="block">{line}</span>);
  const cropClass = draft.guaranteePresentation === "directional-crop" ? "scale-[1.75] translate-x-[12%] -translate-y-[12%]" : "scale-100";

  return <div className="bg-white text-[#080808]">
    <div className="flex h-11 items-center justify-between px-4 text-[8px] font-bold sm:h-14 sm:px-7 sm:text-[10px]"><b className="text-sm tracking-[-.12em] text-[#10233b] sm:text-lg">amino<span className="font-normal">club</span></b>{!isMobile && <span className="text-black/65">Products　 Build a Box　 Bulk Orders　 COAs　 Membership</span>}<span>◯　▢</span></div>
    <div className="flex h-8 items-center justify-center px-3 text-[7px] font-bold tracking-[.18em] text-[#ffe6a4] sm:h-10 sm:text-[9px]" style={{ background: draft.saleBackground }}>END OF SUMMER SALE　 <em className="text-[11px] sm:text-sm">35% Off Sitewide</em>　 CODE HEAT35</div>
    <section className={"grid overflow-hidden " + (isMobile ? "" : "grid-cols-2")}>
      <div className={"flex min-h-[260px] flex-col justify-center px-5 py-8 sm:min-h-[390px] sm:px-10 " + (isMobile ? "order-2" : "")}><h3 className="text-3xl font-semibold leading-[.94] tracking-[-.07em] sm:text-5xl">{title}</h3><p className="mt-4 max-w-sm text-xs leading-5 text-black/65 sm:text-sm">{draft.heroDescription}</p><button type="button" className="mt-5 w-fit rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white sm:px-7 sm:py-3">{draft.heroCta}　→</button></div>
      <div className="relative min-h-[260px] overflow-hidden sm:min-h-[390px]" style={{ background: draft.heroBackground }}><Image src={draft.heroImage} alt="" width={600} height={800} className="absolute bottom-[-18%] left-[4%] h-[105%] w-auto -rotate-12 object-contain drop-shadow-2xl" /><Image src="/amino/NAD-Spray.png" alt="" width={240} height={400} className="absolute right-[18%] top-[8%] h-[65%] w-auto rotate-12 object-contain" /></div>
    </section>
    <section className={"grid " + (isMobile ? "" : "grid-cols-2")}>
      <div className="relative min-h-[260px] overflow-hidden" style={{ background: draft.guaranteeBackground }}><Image src={draft.guaranteeImage} alt="" width={600} height={800} className={"absolute left-[6%] top-[8%] h-[86%] w-auto rotate-[15deg] object-contain transition-transform duration-300 " + cropClass} /></div>
      <div className="relative z-10 flex flex-col justify-center bg-white px-5 py-8 sm:px-8"><p className="text-[8px] font-bold uppercase tracking-[.14em]">The Amino Club Guarantee</p><h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{draft.guaranteeTitle}</h3><p className="mt-2 max-w-sm text-xs leading-5 text-black/55">{draft.guaranteeDescription}</p><div className="mt-5 grid gap-2 sm:-ml-5">{[[draft.guaranteeCardOneColor, draft.guaranteeCardOneTitle, draft.guaranteeCardOneDetail], [draft.guaranteeCardTwoColor, draft.guaranteeCardTwoTitle, draft.guaranteeCardTwoDetail], [draft.guaranteeCardThreeColor, draft.guaranteeCardThreeTitle, draft.guaranteeCardThreeDetail]].map(([color, title, detail], index) => <article key={index} className="relative flex items-center gap-3 bg-white py-3 pl-7 pr-3 shadow-[0_5px_20px_rgba(0,0,0,.06)]"><span className="absolute inset-y-0 left-0 w-3 sm:w-5" style={{ background: color }} /><span className="relative grid size-7 place-items-center rounded-full sm:size-9" style={{ background: color }}><CheckCircleIcon size={16} weight="fill" /></span><span className="relative"><span className="block text-[10px] font-bold sm:text-xs">{title}</span><span className="mt-0.5 block text-[9px] text-black/45 sm:text-[10px]">{detail}</span></span></article>)}</div></div>
    </section>
    <section className={"grid " + (isMobile ? "" : "grid-cols-2")} style={{ background: draft.subscriptionBackground }}><div className="flex min-h-[250px] flex-col justify-center px-5 py-8 sm:px-10"><p className="text-[8px] font-bold uppercase tracking-[.14em]">New · Subscription box</p><h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{draft.subscriptionTitle}</h3><p className="mt-3 max-w-sm text-xs leading-5 text-black/60">{draft.subscriptionDescription}</p><button type="button" className="mt-5 w-fit rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">{draft.subscriptionCta}</button></div><div className="grid min-h-[250px] place-items-center p-8"><div className="grid w-48 grid-cols-2 gap-2 rounded-2xl bg-white p-3 shadow-xl">{productImages.map((item) => <div key={item.value} className="grid aspect-square place-items-center rounded-lg bg-[#edf0f4]"><Image src={item.value} alt="" width={65} height={80} className="max-h-14 w-auto object-contain" /></div>)}</div></div></section>
    <section className="relative min-h-[350px] overflow-hidden px-5 py-12 text-center sm:px-10" style={{ background: draft.bulkBackground }}><div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_20%,#fffbd2_0,transparent_35%)]" /><div className="relative mx-auto max-w-xl"><p className="text-[8px] font-bold uppercase tracking-[.14em]">New · Bulk orders</p><h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{draft.bulkTitle}</h3><p className="mt-3 text-xs leading-5 text-black/60">{draft.bulkDescription}</p><div className="mt-4 flex justify-center gap-2 text-[9px] font-bold"><span className="rounded-full bg-black px-3 py-2 text-white">10+ units · 40% off</span><span className="rounded-full bg-white px-3 py-2">50+ units · 50% off</span></div><button type="button" className="mt-5 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">{draft.bulkCta}</button></div></section>
    <section className={"grid text-white " + (isMobile ? "" : "grid-cols-2")} style={{ background: draft.clubBackground }}><div className="flex min-h-[290px] flex-col justify-center px-5 py-9 sm:px-10"><p className="text-[8px] font-bold uppercase tracking-[.16em] text-[#d9b969]">Club Tab</p><h3 className="mt-3 font-serif text-4xl sm:text-5xl">{draft.clubTitle}</h3><p className="mt-4 max-w-sm text-xs leading-5 text-white/65">{draft.clubDescription}</p><button type="button" className="mt-5 w-fit rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#17150f]">{draft.clubCta}</button></div><div className="grid min-h-[290px] place-items-center p-7"><div className="w-44 rotate-[4deg] bg-[#fffcf4] p-4 text-[#17150f] shadow-xl"><p className="text-[8px] font-bold tracking-[.12em]">AMINO CLUB　TAB NO. 0001</p><div className="mt-5 grid gap-2 border-y border-dashed py-4 text-[10px]"><p>today　 $500.00　 <b className="text-[#3c9f69]">PAID</b></p><p>sep 2　 $166.67</p><p>sep 9　 $166.67</p></div></div></div></section>
    <section className={"grid " + (isMobile ? "" : "grid-cols-2")} style={{ background: draft.bundlesBackground }}><div className="flex min-h-[260px] flex-col justify-center px-5 py-8 sm:px-10"><p className="text-[8px] font-bold uppercase tracking-[.14em] text-[#4c65e9]">Research bundles · new</p><h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{draft.bundlesTitle}</h3><p className="mt-3 max-w-sm text-xs leading-5 text-black/60">{draft.bundlesDescription}</p><span className="mt-5 w-fit rounded-lg bg-[#3148ef] px-4 py-2 text-xs font-bold text-white">Build a bundle</span></div><div className="grid min-h-[260px] place-items-center p-7"><div className="w-48 rounded-xl bg-white p-4 shadow-lg"><p className="text-[8px] font-bold text-[#6474fa]">RESEARCH BUNDLE</p><p className="mt-2 text-xs font-bold">Shared with you</p><div className="mt-3 border-t pt-3 text-[9px] text-[#39a76c]">2-DAY SHIPPING　FREE</div></div></div></section>
    <section className={"grid " + (isMobile ? "" : "grid-cols-2")} style={{ background: draft.creditBackground }}><div className="flex min-h-[220px] flex-col justify-center px-5 py-8 sm:px-10"><p className="text-[8px] font-bold uppercase tracking-[.14em] text-[#375849]">Amino Club credit</p><h3 className="mt-3 text-2xl font-semibold leading-tight text-[#214c3b] sm:text-3xl">{draft.creditTitle}</h3><span className="mt-5 w-fit rounded-full bg-[#174534] px-4 py-2 text-xs font-bold text-white">Buy points</span></div><div className="grid min-h-[220px] place-items-center p-7"><div className="w-52 rounded-xl border-2 border-[#37624f] bg-white/75 p-4 text-[#214c3b]"><p className="text-[8px] font-bold">AMINO CLUB · CREDIT NOTE</p><p className="mt-6 text-3xl font-serif">10,500 pts</p><p className="mt-3 text-[10px]">+500 pts free</p></div></div></section>
    <section className="px-5 py-12 text-center sm:px-10" style={{ background: draft.successBackground }}><h3 className="text-2xl font-semibold sm:text-3xl">{draft.successTitle}</h3><div className="mt-6 grid gap-2 text-left sm:grid-cols-2"><div className="rounded-xl bg-white p-4 text-xs font-bold">Join a community of researchers</div><div className="rounded-xl bg-white p-4 text-xs font-bold">Expert support whenever you need it</div></div></section>
    <section className={"grid " + (isMobile ? "" : "grid-cols-2") + " bg-white px-5 py-12 sm:px-10"}><div><p className="text-[8px] font-bold uppercase tracking-[.14em]">Quality you can verify</p><h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{draft.qualityTitle}</h3><p className="mt-3 text-xs leading-5 text-black/60">{draft.qualityDescription}</p></div><div className="mt-6 grid place-items-center sm:mt-0"><div className="rounded-2xl bg-[#e1ecf8] p-8 text-xs font-bold">99%+ Purity<br />Verified by HPLC</div></div></section>
    <section className="bg-white px-5 py-12 text-center sm:px-10"><h3 className="text-2xl font-semibold sm:text-3xl">{draft.faqTitle}</h3><p className="mt-2 text-xs text-black/55">{draft.faqDescription}</p><div className="mx-auto mt-5 max-w-xl divide-y border-y text-left text-xs font-bold"><p className="py-3">What purity level are your peptides?</p><p className="py-3">What is a Certificate of Analysis?</p><p className="py-3">What is Amino H2O?</p></div></section>
    <footer className="px-5 py-12 text-center text-white sm:px-10" style={{ background: draft.footerBackground }}><div className="bg-white/8 px-5 py-8"><h3 className="mx-auto max-w-xl text-2xl font-semibold sm:text-3xl">{draft.footerCta}</h3><button type="button" className="mt-5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black">Shop Now</button></div><p className="mt-8 text-[10px] text-white/50">© 2026 Amino Club. All rights reserved.</p></footer>
  </div>;
}

function EditorSection({ icon: Icon, title, children }: { icon: typeof PencilSimpleIcon; title: string; children: ReactNode }) {
  return <section className="mt-5 border-t border-black/7 pt-5"><div className="mb-4 flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-[#eef4f0] text-[#245440]"><Icon size={16} weight="bold" /></span><h2 className="text-sm font-bold">{title}</h2></div><div className="grid gap-3">{children}</div></section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1.5 text-xs font-bold text-black/55"><span>{label}</span>{children}</label>;
}

function SelectImage({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-1.5 text-xs font-bold text-black/55">{label}<span className="relative"><select value={value} onChange={(event) => onChange(event.target.value)}>{productImages.map((image) => <option key={image.value} value={image.value}>{image.label}</option>)}</select><CaretDownIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" /></span></label>;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const safeValue = typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : "#ffffff";
  return <label className="flex items-center justify-between rounded-xl border border-black/8 px-3 py-2.5 text-xs font-bold text-black/55"><span>{label}</span><span className="flex items-center gap-2"><span className="font-mono text-[11px] text-black/40">{safeValue}</span><input aria-label={label} type="color" value={safeValue} onChange={(event) => onChange(event.target.value)} className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0" /></span></label>;
}

function GuaranteeCardFields({ number, title, detail, color, onTitleChange, onDetailChange, onColorChange }: { number: string; title: string; detail: string; color: string; onTitleChange: (value: string) => void; onDetailChange: (value: string) => void; onColorChange: (value: string) => void }) {
  return <div className="grid gap-2 rounded-xl border border-black/8 bg-[#fafbfa] p-3"><p className="text-[10px] font-black tracking-[.14em] text-black/40">GUARANTEE CARD {number}</p><Field label="Tiêu đề"><input value={title ?? ""} onChange={(event) => onTitleChange(event.target.value)} /></Field><Field label="Mô tả"><input value={detail ?? ""} onChange={(event) => onDetailChange(event.target.value)} /></Field><ColorField label="Màu dải bên trái" value={color} onChange={onColorChange} /></div>;
}
