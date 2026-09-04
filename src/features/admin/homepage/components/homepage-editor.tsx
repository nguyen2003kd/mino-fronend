"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowCounterClockwiseIcon,
  ArrowLeftIcon,
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
import {
  loadHomepageEditorDraft,
  saveHomepageEditorDraft,
} from "@/features/admin/homepage/services/homepage-editor.service";
import {
  initialHomepageDraft,
  type BackgroundMode,
  type EditorSectionId,
  type GradientDirection,
  type HomepageDraft,
  type Viewport,
} from "@/features/admin/homepage/homepage-editor.constants";
import { extractErrorMessage } from "@/utils/error";

const productImages = [
  { label: "Amino H2O", value: "/AminoH2ODesktop.png" },
  { label: "TB-500", value: "/amino/TB500Desktop.webp" },
  { label: "NAD+", value: "/amino/NADDesktop.webp" },
  { label: "NAD+ Nasal Spray", value: "/amino/NAD-Spray.png" },
  { label: "BPC-157", value: "/BPC157Desktop.webp" },
];

export function HomepageEditor() {
  const [draft, setDraft] = useState<HomepageDraft>(initialHomepageDraft);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [activeSection, setActiveSection] = useState<EditorSectionId | null>(null);
  const [notice, setNotice] = useState("Đang tải bản nháp từ máy chủ...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDraft = async () => {
      try {
        const storedDraft = await loadHomepageEditorDraft();
        if (!isMounted) return;

        if (storedDraft) {
          setDraft({ ...initialHomepageDraft, ...storedDraft } as HomepageDraft);
          setNotice("Đã tải bản nháp homepage từ máy chủ.");
        } else {
          setNotice("Chưa có bản nháp trên máy chủ. Bạn có thể bắt đầu chỉnh sửa.");
        }
      } catch (error) {
        if (!isMounted) return;

        const message = extractErrorMessage(error);
        setNotice(`Không thể tải bản nháp: ${message}`);
        toast.error("Không thể tải homepage", { description: message });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDraft();

    return () => {
      isMounted = false;
    };
  }, []);

  function update<K extends keyof HomepageDraft>(key: K, value: HomepageDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setNotice("Preview đã cập nhật · nhấn Lưu & xuất bản để đồng bộ lên trang chủ.");
  }

  function updateContentCard(group: "successCards" | "whyCards", index: number, field: "title" | "description", value: string) {
    setDraft((current) => ({ ...current, [group]: current[group].map((card, cardIndex) => cardIndex === index ? { ...card, [field]: value } : card) }));
    setNotice("Preview đã cập nhật · nhấn Lưu & xuất bản để đồng bộ lên trang chủ.");
  }

  function updateFaq(index: number, value: string) {
    setDraft((current) => ({ ...current, faqItems: current.faqItems.map((item, itemIndex) => itemIndex === index ? value : item) }));
    setNotice("Preview đã cập nhật · nhấn Lưu & xuất bản để đồng bộ lên trang chủ.");
  }

  async function saveDraft() {
    if (isSaving) return;

    setIsSaving(true);

    try {
      await saveHomepageEditorDraft(draft);
      setNotice("Đã lưu và xuất bản homepage.");
      toast.success("Đã xuất bản homepage");
    } catch (error) {
      const message = extractErrorMessage(error);
      setNotice(`Không thể xuất bản: ${message}`);
      toast.error("Không thể lưu homepage", { description: message });
    } finally {
      setIsSaving(false);
    }
  }

  function resetDraft() {
    setDraft(initialHomepageDraft);
    setNotice("Đã khôi phục nội dung mẫu. Nhấn Lưu & xuất bản để cập nhật trang chủ.");
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
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-bold">
              <ArrowLeftIcon size={16} />
              <span className="hidden sm:inline">Thoát</span>
            </Link>
            <Link href="/" target="_blank" className="hidden items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-bold sm:inline-flex">Mở trang chủ <ArrowSquareOutIcon size={16} /></Link>
            <button type="button" onClick={resetDraft} disabled={isSaving} className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white disabled:cursor-not-allowed disabled:opacity-50" aria-label="Reset draft"><ArrowCounterClockwiseIcon size={18} /></button>
            <button type="button" onClick={saveDraft} disabled={isLoading || isSaving} className="inline-flex items-center gap-2 rounded-xl bg-[#173c31] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"><FloppyDiskIcon size={17} weight="bold" />{isSaving ? "Đang lưu..." : "Lưu & xuất bản"}</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-5 p-4 lg:grid-cols-[370px_minmax(0,1fr)] lg:p-6">
        <aside className="flex self-start flex-col rounded-2xl border border-black/8 bg-white p-4 lg:sticky lg:top-20">
          <div className={"order-first rounded-xl border border-[#d2e8dc] bg-[#eff9f3] px-3 py-2.5 text-xs leading-5 text-[#295b47] " + (activeSection ? "hidden" : "")}>{notice}</div>
          <EditorSection id="hero" active={activeSection === "hero"} onActivate={() => setActiveSection("hero")} icon={PencilSimpleIcon} title="Hero">
            <Field label="Tiêu đề"><textarea value={draft.heroTitle} onChange={(event) => update("heroTitle", event.target.value)} rows={3} /></Field>
            <Field label="Mô tả"><textarea value={draft.heroDescription} onChange={(event) => update("heroDescription", event.target.value)} rows={4} /></Field>
            <Field label="Nhãn nút CTA"><input value={draft.heroCta} onChange={(event) => update("heroCta", event.target.value)} /></Field>
            <SelectImage label="Ảnh hero" value={draft.heroImage} onChange={(value) => update("heroImage", value)} />
            <GradientField label="Nền hero" mode={draft.heroBackgroundMode} start={draft.heroBackground} end={draft.heroBackgroundEnd} direction={draft.heroGradientDirection} onModeChange={(value) => update("heroBackgroundMode", value)} onStartChange={(value) => update("heroBackground", value)} onEndChange={(value) => update("heroBackgroundEnd", value)} onDirectionChange={(value) => update("heroGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="guarantee" active={activeSection === "guarantee"} onActivate={() => setActiveSection("guarantee")} icon={ImageIcon} title="Guarantee">
            <Field label="Tiêu đề"><input value={draft.guaranteeTitle} onChange={(event) => update("guaranteeTitle", event.target.value)} /></Field>
            <Field label="Mô tả"><textarea value={draft.guaranteeDescription} onChange={(event) => update("guaranteeDescription", event.target.value)} rows={3} /></Field>
            <SelectImage label="Ảnh Guarantee" value={draft.guaranteeImage} onChange={(value) => update("guaranteeImage", value)} />
            <GradientField label="Nền ảnh" mode={draft.guaranteeBackgroundMode} start={draft.guaranteeBackground} end={draft.guaranteeBackgroundEnd} direction={draft.guaranteeGradientDirection} onModeChange={(value) => update("guaranteeBackgroundMode", value)} onStartChange={(value) => update("guaranteeBackground", value)} onEndChange={(value) => update("guaranteeBackgroundEnd", value)} onDirectionChange={(value) => update("guaranteeGradientDirection", value)} />
            <label className="grid gap-1.5 text-xs font-bold text-black/55">Cách đặt ảnh<select value={draft.guaranteePresentation} onChange={(event) => update("guaranteePresentation", event.target.value as HomepageDraft["guaranteePresentation"])}><option value="contained">Bình thường</option><option value="directional-crop">Crop lớn theo hướng</option></select></label>
            <GuaranteeCardFields number="01" title={draft.guaranteeCardOneTitle} detail={draft.guaranteeCardOneDetail} color={draft.guaranteeCardOneColor} onTitleChange={(value) => update("guaranteeCardOneTitle", value)} onDetailChange={(value) => update("guaranteeCardOneDetail", value)} onColorChange={(value) => update("guaranteeCardOneColor", value)} />
            <GuaranteeCardFields number="02" title={draft.guaranteeCardTwoTitle} detail={draft.guaranteeCardTwoDetail} color={draft.guaranteeCardTwoColor} onTitleChange={(value) => update("guaranteeCardTwoTitle", value)} onDetailChange={(value) => update("guaranteeCardTwoDetail", value)} onColorChange={(value) => update("guaranteeCardTwoColor", value)} />
            <GuaranteeCardFields number="03" title={draft.guaranteeCardThreeTitle} detail={draft.guaranteeCardThreeDetail} color={draft.guaranteeCardThreeColor} onTitleChange={(value) => update("guaranteeCardThreeTitle", value)} onDetailChange={(value) => update("guaranteeCardThreeDetail", value)} onColorChange={(value) => update("guaranteeCardThreeColor", value)} />
          </EditorSection>

          <EditorSection id="brand" active={activeSection === "brand"} onActivate={() => setActiveSection("brand")} icon={EyeIcon} title="Thương hiệu">
            <GradientField label="Sale strip" mode={draft.saleBackgroundMode} start={draft.saleBackground} end={draft.saleBackgroundEnd} direction={draft.saleGradientDirection} onModeChange={(value) => update("saleBackgroundMode", value)} onStartChange={(value) => update("saleBackground", value)} onEndChange={(value) => update("saleBackgroundEnd", value)} onDirectionChange={(value) => update("saleGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="subscription" active={activeSection === "subscription"} onActivate={() => setActiveSection("subscription")} icon={PencilSimpleIcon} title="Subscription box">
            <Field label="Tiêu đề"><textarea value={draft.subscriptionTitle} onChange={(event) => update("subscriptionTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả"><textarea value={draft.subscriptionDescription} onChange={(event) => update("subscriptionDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.subscriptionCta} onChange={(event) => update("subscriptionCta", event.target.value)} /></Field>
            <Field label="Tên hộp"><input value={draft.subscriptionBoxTitle} onChange={(event) => update("subscriptionBoxTitle", event.target.value)} /></Field>
            <Field label="Nhãn hộp"><input value={draft.subscriptionBoxBadge} onChange={(event) => update("subscriptionBoxBadge", event.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-2"><SelectImage label="Ảnh sản phẩm 01" value={draft.subscriptionBoxImageOne} onChange={(value) => update("subscriptionBoxImageOne", value)} /><SelectImage label="Ảnh sản phẩm 02" value={draft.subscriptionBoxImageTwo} onChange={(value) => update("subscriptionBoxImageTwo", value)} /><SelectImage label="Ảnh sản phẩm 03" value={draft.subscriptionBoxImageThree} onChange={(value) => update("subscriptionBoxImageThree", value)} /><SelectImage label="Ảnh sản phẩm 04" value={draft.subscriptionBoxImageFour} onChange={(value) => update("subscriptionBoxImageFour", value)} /></div>
            <Field label="Quyền lợi 01"><input value={draft.subscriptionBenefitOne} onChange={(event) => update("subscriptionBenefitOne", event.target.value)} /></Field>
            <Field label="Quyền lợi 02"><input value={draft.subscriptionBenefitTwo} onChange={(event) => update("subscriptionBenefitTwo", event.target.value)} /></Field>
            <Field label="Quyền lợi 03"><input value={draft.subscriptionBenefitThree} onChange={(event) => update("subscriptionBenefitThree", event.target.value)} /></Field>
            <Field label="Quyền lợi 04"><input value={draft.subscriptionBenefitFour} onChange={(event) => update("subscriptionBenefitFour", event.target.value)} /></Field>
            <GradientField label="Nền section" mode={draft.subscriptionBackgroundMode} start={draft.subscriptionBackground} end={draft.subscriptionBackgroundEnd} direction={draft.subscriptionGradientDirection} onModeChange={(value) => update("subscriptionBackgroundMode", value)} onStartChange={(value) => update("subscriptionBackground", value)} onEndChange={(value) => update("subscriptionBackgroundEnd", value)} onDirectionChange={(value) => update("subscriptionGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="bulk" active={activeSection === "bulk"} onActivate={() => setActiveSection("bulk")} icon={PencilSimpleIcon} title="Bulk orders">
            <Field label="Tiêu đề"><textarea value={draft.bulkTitle} onChange={(event) => update("bulkTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả"><textarea value={draft.bulkDescription} onChange={(event) => update("bulkDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.bulkCta} onChange={(event) => update("bulkCta", event.target.value)} /></Field>
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">THẺ SẢN PHẨM BULK</p>
            <Field label="Tên sản phẩm"><input value={draft.bulkProductTitle} onChange={(event) => update("bulkProductTitle", event.target.value)} /></Field>
            <Field label="Mô tả sản phẩm"><input value={draft.bulkProductDetail} onChange={(event) => update("bulkProductDetail", event.target.value)} /></Field>
            <Field label="Giá"><input value={draft.bulkProductPrice} onChange={(event) => update("bulkProductPrice", event.target.value)} /></Field>
            <SelectImage label="Ảnh sản phẩm bulk" value={draft.bulkProductImage} onChange={(value) => update("bulkProductImage", value)} />
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">ẢNH SẢN PHẨM ĐANG RƠI</p>
            <div className="grid grid-cols-2 gap-2"><SelectImage label="Ảnh rơi 01" value={draft.bulkRainImageOne} onChange={(value) => update("bulkRainImageOne", value)} /><SelectImage label="Ảnh rơi 02" value={draft.bulkRainImageTwo} onChange={(value) => update("bulkRainImageTwo", value)} /><SelectImage label="Ảnh rơi 03" value={draft.bulkRainImageThree} onChange={(value) => update("bulkRainImageThree", value)} /><SelectImage label="Ảnh rơi 04" value={draft.bulkRainImageFour} onChange={(value) => update("bulkRainImageFour", value)} /></div>
            <GradientField label="Nền section" mode={draft.bulkBackgroundMode} start={draft.bulkBackground} end={draft.bulkBackgroundEnd} direction={draft.bulkGradientDirection} onModeChange={(value) => update("bulkBackgroundMode", value)} onStartChange={(value) => update("bulkBackground", value)} onEndChange={(value) => update("bulkBackgroundEnd", value)} onDirectionChange={(value) => update("bulkGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="club" active={activeSection === "club"} onActivate={() => setActiveSection("club")} icon={PencilSimpleIcon} title="Club Tab">
            <Field label="Tiêu đề"><input value={draft.clubTitle} onChange={(event) => update("clubTitle", event.target.value)} /></Field>
            <Field label="Mô tả"><textarea value={draft.clubDescription} onChange={(event) => update("clubDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA"><input value={draft.clubCta} onChange={(event) => update("clubCta", event.target.value)} /></Field>
            <GradientField label="Nền section" mode={draft.clubBackgroundMode} start={draft.clubBackground} end={draft.clubBackgroundEnd} direction={draft.clubGradientDirection} onModeChange={(value) => update("clubBackgroundMode", value)} onStartChange={(value) => update("clubBackground", value)} onEndChange={(value) => update("clubBackgroundEnd", value)} onDirectionChange={(value) => update("clubGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="bundles" active={activeSection === "bundles"} onActivate={() => setActiveSection("bundles")} icon={PencilSimpleIcon} title="Bundles & Credit">
            <Field label="Tiêu đề Bundles"><textarea value={draft.bundlesTitle} onChange={(event) => update("bundlesTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả Bundles"><textarea value={draft.bundlesDescription} onChange={(event) => update("bundlesDescription", event.target.value)} rows={3} /></Field>
            <Field label="Nút Bundles"><input value={draft.bundlesCta} onChange={(event) => update("bundlesCta", event.target.value)} /></Field>
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">THẺ RESEARCH BUNDLE</p>
            <Field label="Nhãn thẻ"><input value={draft.bundlesCardLabel} onChange={(event) => update("bundlesCardLabel", event.target.value)} /></Field>
            <Field label="Tiêu đề thẻ"><input value={draft.bundlesCardTitle} onChange={(event) => update("bundlesCardTitle", event.target.value)} /></Field>
            <div className="grid grid-cols-[1fr_72px] gap-2"><Field label="Sản phẩm 01"><input value={draft.bundlesItemOne} onChange={(event) => update("bundlesItemOne", event.target.value)} /></Field><Field label="SL"><input value={draft.bundlesItemOneQuantity} onChange={(event) => update("bundlesItemOneQuantity", event.target.value)} /></Field></div>
            <div className="grid grid-cols-[1fr_72px] gap-2"><Field label="Sản phẩm 02"><input value={draft.bundlesItemTwo} onChange={(event) => update("bundlesItemTwo", event.target.value)} /></Field><Field label="SL"><input value={draft.bundlesItemTwoQuantity} onChange={(event) => update("bundlesItemTwoQuantity", event.target.value)} /></Field></div>
            <div className="grid grid-cols-[1fr_72px] gap-2"><Field label="Sản phẩm 03"><input value={draft.bundlesItemThree} onChange={(event) => update("bundlesItemThree", event.target.value)} /></Field><Field label="SL"><input value={draft.bundlesItemThreeQuantity} onChange={(event) => update("bundlesItemThreeQuantity", event.target.value)} /></Field></div>
            <div className="grid grid-cols-2 gap-2"><Field label="Nhãn shipping"><input value={draft.bundlesShippingLabel} onChange={(event) => update("bundlesShippingLabel", event.target.value)} /></Field><Field label="Giá trị shipping"><input value={draft.bundlesShippingValue} onChange={(event) => update("bundlesShippingValue", event.target.value)} /></Field></div>
            <div className="grid grid-cols-2 gap-2"><Field label="Badge điểm"><input value={draft.bundlesPointsTitle} onChange={(event) => update("bundlesPointsTitle", event.target.value)} /></Field><Field label="Mô tả badge"><input value={draft.bundlesPointsDetail} onChange={(event) => update("bundlesPointsDetail", event.target.value)} /></Field></div>
            <GradientField label="Nền Bundles" mode={draft.bundlesBackgroundMode} start={draft.bundlesBackground} end={draft.bundlesBackgroundEnd} direction={draft.bundlesGradientDirection} onModeChange={(value) => update("bundlesBackgroundMode", value)} onStartChange={(value) => update("bundlesBackground", value)} onEndChange={(value) => update("bundlesBackgroundEnd", value)} onDirectionChange={(value) => update("bundlesGradientDirection", value)} />
            <Field label="Tiêu đề Credit"><textarea value={draft.creditTitle} onChange={(event) => update("creditTitle", event.target.value)} rows={2} /></Field>
            <GradientField label="Nền Credit" mode={draft.creditBackgroundMode} start={draft.creditBackground} end={draft.creditBackgroundEnd} direction={draft.creditGradientDirection} onModeChange={(value) => update("creditBackgroundMode", value)} onStartChange={(value) => update("creditBackground", value)} onEndChange={(value) => update("creditBackgroundEnd", value)} onDirectionChange={(value) => update("creditGradientDirection", value)} />
          </EditorSection>

          <EditorSection id="success" active={activeSection === "success"} onActivate={() => setActiveSection("success")} icon={PencilSimpleIcon} title="Success">
            <Field label="Tiêu đề Success"><input value={draft.successTitle} onChange={(event) => update("successTitle", event.target.value)} /></Field>
            <GradientField label="Nền Success" mode={draft.successBackgroundMode} start={draft.successBackground} end={draft.successBackgroundEnd} direction={draft.successGradientDirection} onModeChange={(value) => update("successBackgroundMode", value)} onStartChange={(value) => update("successBackground", value)} onEndChange={(value) => update("successBackgroundEnd", value)} onDirectionChange={(value) => update("successGradientDirection", value)} />
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">THẺ SUCCESS</p>
            {draft.successCards.map((card, index) => <ContentCardFields key={`success-${index}`} label={`THẺ SUCCESS ${String(index + 1).padStart(2, "0")}`} title={card.title} description={card.description} onTitleChange={(value) => updateContentCard("successCards", index, "title", value)} onDescriptionChange={(value) => updateContentCard("successCards", index, "description", value)} />)}
          </EditorSection>

          <EditorSection id="quality" active={activeSection === "quality"} onActivate={() => setActiveSection("quality")} icon={PencilSimpleIcon} title="Quality">
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">QUALITY</p>
            <Field label="Tiêu đề Quality"><textarea value={draft.qualityTitle} onChange={(event) => update("qualityTitle", event.target.value)} rows={2} /></Field>
            <Field label="Mô tả Quality"><textarea value={draft.qualityDescription} onChange={(event) => update("qualityDescription", event.target.value)} rows={2} /></Field>
            <div className="grid grid-cols-2 gap-2"><Field label="Chỉ số 01"><input value={draft.qualityMetricOneValue} onChange={(event) => update("qualityMetricOneValue", event.target.value)} /></Field><Field label="Nhãn 01"><input value={draft.qualityMetricOneLabel} onChange={(event) => update("qualityMetricOneLabel", event.target.value)} /></Field></div>
            <div className="grid grid-cols-2 gap-2"><Field label="Chỉ số 02"><input value={draft.qualityMetricTwoValue} onChange={(event) => update("qualityMetricTwoValue", event.target.value)} /></Field><Field label="Nhãn 02"><input value={draft.qualityMetricTwoLabel} onChange={(event) => update("qualityMetricTwoLabel", event.target.value)} /></Field></div>
            <div className="grid grid-cols-2 gap-2"><Field label="Chỉ số 03"><input value={draft.qualityMetricThreeValue} onChange={(event) => update("qualityMetricThreeValue", event.target.value)} /></Field><Field label="Nhãn 03"><input value={draft.qualityMetricThreeLabel} onChange={(event) => update("qualityMetricThreeLabel", event.target.value)} /></Field></div>
            <Field label="Tiêu đề proof"><input value={draft.qualityProofTitle} onChange={(event) => update("qualityProofTitle", event.target.value)} /></Field>
            <Field label="Mô tả proof"><input value={draft.qualityProofDescription} onChange={(event) => update("qualityProofDescription", event.target.value)} /></Field>
          </EditorSection>

          <EditorSection id="why" active={activeSection === "why"} onActivate={() => setActiveSection("why")} icon={PencilSimpleIcon} title="Why choose">
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">WHY CHOOSE</p>
            <Field label="Tiêu đề Why choose"><input value={draft.whyTitle} onChange={(event) => update("whyTitle", event.target.value)} /></Field>
            {draft.whyCards.map((card, index) => <ContentCardFields key={`why-${index}`} label={`THẺ WHY ${String(index + 1).padStart(2, "0")}`} title={card.title} description={card.description} onTitleChange={(value) => updateContentCard("whyCards", index, "title", value)} onDescriptionChange={(value) => updateContentCard("whyCards", index, "description", value)} />)}
          </EditorSection>

          <EditorSection id="faq" active={activeSection === "faq"} onActivate={() => setActiveSection("faq")} icon={PencilSimpleIcon} title="FAQ">
            <p className="text-[10px] font-black tracking-[.14em] text-black/40">FAQ</p>
            <Field label="Tiêu đề FAQ"><input value={draft.faqTitle} onChange={(event) => update("faqTitle", event.target.value)} /></Field>
            <Field label="Mô tả FAQ"><textarea value={draft.faqDescription} onChange={(event) => update("faqDescription", event.target.value)} rows={2} /></Field>
            {draft.faqItems.map((item, index) => <Field key={`faq-${index}`} label={`Câu hỏi ${String(index + 1).padStart(2, "0")}`}><input value={item} onChange={(event) => updateFaq(index, event.target.value)} /></Field>)}
          </EditorSection>

          <EditorSection id="footer" active={activeSection === "footer"} onActivate={() => setActiveSection("footer")} icon={PencilSimpleIcon} title="CTA & Footer">
            <Field label="Lời gọi hành động"><textarea value={draft.footerCta} onChange={(event) => update("footerCta", event.target.value)} rows={3} /></Field>
            <Field label="Nút CTA Footer"><input value={draft.footerShopCta} onChange={(event) => update("footerShopCta", event.target.value)} /></Field>
            <Field label="Mô tả Footer"><textarea value={draft.footerDescription} onChange={(event) => update("footerDescription", event.target.value)} rows={2} /></Field>
            <GradientField label="Nền Footer" mode={draft.footerBackgroundMode} start={draft.footerBackground} end={draft.footerBackgroundEnd} direction={draft.footerGradientDirection} onModeChange={(value) => update("footerBackgroundMode", value)} onStartChange={(value) => update("footerBackground", value)} onEndChange={(value) => update("footerBackgroundEnd", value)} onDirectionChange={(value) => update("footerGradientDirection", value)} />
          </EditorSection>
        </aside>

        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.15em] text-black/45">Live mock preview</p><h2 className="mt-1 text-xl font-semibold">Trang chủ sẽ hiển thị như thế này</h2></div>
            <div className="flex rounded-xl border border-black/10 bg-white p-1"><button type="button" onClick={() => setViewport("desktop")} className={"grid h-8 w-9 place-items-center rounded-lg " + (viewport === "desktop" ? "bg-[#173c31] text-white" : "text-black/45")} aria-label="Desktop preview"><DesktopIcon size={18} /></button><button type="button" onClick={() => setViewport("mobile")} className={"grid h-8 w-9 place-items-center rounded-lg " + (viewport === "mobile" ? "bg-[#173c31] text-white" : "text-black/45")} aria-label="Mobile preview"><DeviceMobileIcon size={18} /></button></div>
          </div>

          <div className="overflow-auto rounded-2xl border border-black/10 bg-[#d9dddc] p-3 sm:p-5">
            <HomepageFramePreview draft={draft} viewport={viewport} onSectionSelect={setActiveSection} />
          </div>
        </section>
      </div>
    </main>
  );
}

function HomepageFramePreview({ draft, viewport, onSectionSelect }: { draft: HomepageDraft; viewport: Viewport; onSectionSelect: (section: EditorSectionId) => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [previewReady, setPreviewReady] = useState(false);
  const desktopCanvasWidth = 1536;
  const mobileCanvasWidth = 390;
  const canvasWidth = viewport === "desktop" ? desktopCanvasWidth : mobileCanvasWidth;
  const canvasHeight = 820;
  const scale = Math.min(1, (availableWidth || canvasWidth) / canvasWidth);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const updateWidth = () => setAvailableWidth(preview.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  const applyDraft = useCallback((document: Document | null) => {
    if (!document) return;
    const background = (mode: BackgroundMode, start: string, end: string, direction: GradientDirection) => mode === "solid" ? start : `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`;
    const setText = (selector: string, value: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) element.textContent = value;
    };
    const setMultilineText = (selector: string, value: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return;
      element.replaceChildren();
      value.split("\n").forEach((line, index) => {
        if (index) element.append(document.createElement("br"));
        element.append(document.createTextNode(line));
      });
    };
    const setButtonText = (selector: string, value: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (element?.firstChild) element.firstChild.textContent = value + " ";
    };

    setMultilineText("#top h1", draft.heroTitle);
    setText("#top h1 + p", draft.heroDescription);
    setButtonText("#top .hero-button", draft.heroCta);
    const heroGradient = document.querySelector<HTMLElement>("#top > div:first-child > div:last-child");
    if (heroGradient) heroGradient.style.background = background(draft.heroBackgroundMode, draft.heroBackground, draft.heroBackgroundEnd, draft.heroGradientDirection);
    const saleStrip = document.querySelector<HTMLElement>(".sale-strip");
    if (saleStrip) saleStrip.style.background = background(draft.saleBackgroundMode, draft.saleBackground, draft.saleBackgroundEnd, draft.saleGradientDirection);

    setText("#section-3 h2", draft.guaranteeTitle);
    setText("#section-3 h2 + p", draft.guaranteeDescription);
    const guaranteeVisual = document.querySelector<HTMLElement>(".guarantee-visual");
    if (guaranteeVisual) guaranteeVisual.style.background = background(draft.guaranteeBackgroundMode, draft.guaranteeBackground, draft.guaranteeBackgroundEnd, draft.guaranteeGradientDirection);
    const guaranteeImage = document.querySelector<HTMLImageElement>(".guarantee-visual img");
    if (guaranteeImage) guaranteeImage.src = draft.guaranteeImage;
    const cards = [[draft.guaranteeCardOneColor, draft.guaranteeCardOneTitle, draft.guaranteeCardOneDetail], [draft.guaranteeCardTwoColor, draft.guaranteeCardTwoTitle, draft.guaranteeCardTwoDetail], [draft.guaranteeCardThreeColor, draft.guaranteeCardThreeTitle, draft.guaranteeCardThreeDetail]];
    document.querySelectorAll<HTMLElement>("#section-3 article").forEach((card, index) => {
      const values = cards[index];
      if (!values) return;
      const [color, title, detail] = values;
      const stripe = card.querySelector<HTMLElement>(":scope > span");
      if (stripe) stripe.style.background = color;
      const circle = card.querySelector<HTMLElement>(":scope > span + span");
      if (circle) circle.style.background = color;
      const text = card.querySelectorAll<HTMLElement>("p");
      if (text[0]) text[0].textContent = title;
      if (text[1]) text[1].textContent = detail;
    });

    setText("#section-1 h2", draft.subscriptionTitle);
    setText("#section-1 h2 + p", draft.subscriptionDescription);
    setButtonText("#section-1 .hero-button", draft.subscriptionCta);
    const subscriptionHeader = document.querySelectorAll<HTMLElement>("#section-1 .subscription-card > div:first-child > span");
    if (subscriptionHeader[0]) subscriptionHeader[0].textContent = draft.subscriptionBoxTitle;
    if (subscriptionHeader[1]) subscriptionHeader[1].textContent = draft.subscriptionBoxBadge;
    const subscriptionImages = [draft.subscriptionBoxImageOne, draft.subscriptionBoxImageTwo, draft.subscriptionBoxImageThree, draft.subscriptionBoxImageFour];
    document.querySelectorAll<HTMLImageElement>("#section-1 .subscription-card > div:nth-child(2) img").forEach((image, index) => {
      if (subscriptionImages[index]) {
        image.srcset = "";
        image.src = subscriptionImages[index];
      }
    });
    const benefits = [draft.subscriptionBenefitOne, draft.subscriptionBenefitTwo, draft.subscriptionBenefitThree, draft.subscriptionBenefitFour];
    document.querySelectorAll<HTMLElement>("#section-1 ul li").forEach((item, index) => {
      const value = benefits[index];
      if (!value) return;
      const textNode = Array.from(item.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.textContent = value;
      else item.append(document.createTextNode(value));
    });
    const subscription = document.querySelector<HTMLElement>("#section-1");
    if (subscription) subscription.style.background = background(draft.subscriptionBackgroundMode, draft.subscriptionBackground, draft.subscriptionBackgroundEnd, draft.subscriptionGradientDirection);
    setText("#section-2 h2", draft.bulkTitle);
    setText("#section-2 h2 + p", draft.bulkDescription);
    setButtonText("#section-2 .hero-button", draft.bulkCta);
    const bulkCard = document.querySelector<HTMLElement>("[data-bulk-product-card]");
    if (bulkCard) {
      const labels = bulkCard.querySelectorAll<HTMLElement>("b");
      if (labels[0]) labels[0].textContent = draft.bulkProductTitle;
      if (labels[1]) labels[1].textContent = draft.bulkProductPrice;
      const detail = bulkCard.querySelector<HTMLElement>("p");
      if (detail) detail.textContent = draft.bulkProductDetail;
      const image = bulkCard.querySelector<HTMLImageElement>("img");
      if (image) { image.srcset = ""; image.src = draft.bulkProductImage; }
    }
    const rainImages = [draft.bulkRainImageOne, draft.bulkRainImageTwo, draft.bulkRainImageThree, draft.bulkRainImageFour];
    document.querySelectorAll<HTMLImageElement>("#section-2 .rain-vial").forEach((image, index) => {
      image.srcset = "";
      image.src = rainImages[index % rainImages.length];
    });
    const bulk = document.querySelector<HTMLElement>("#section-2");
    if (bulk) bulk.style.background = background(draft.bulkBackgroundMode, draft.bulkBackground, draft.bulkBackgroundEnd, draft.bulkGradientDirection);
    setText("#section-4 h2", draft.clubTitle);
    setText("#section-4 h2 + p", draft.clubDescription);
    setButtonText("#section-4 .button-light", draft.clubCta);
    const club = document.querySelector<HTMLElement>("#section-4");
    if (club) club.style.background = background(draft.clubBackgroundMode, draft.clubBackground, draft.clubBackgroundEnd, draft.clubGradientDirection);
    setText("#section-6 h2", draft.bundlesTitle);
    setText("#section-6 h2 + p", draft.bundlesDescription);
    setText("#section-6 a", draft.bundlesCta);
    setText("#section-6 .bundle-ticket > p", draft.bundlesCardLabel);
    setText("#section-6 .bundle-ticket > h3", draft.bundlesCardTitle);
    const bundleItems = [[draft.bundlesItemOne, draft.bundlesItemOneQuantity], [draft.bundlesItemTwo, draft.bundlesItemTwoQuantity], [draft.bundlesItemThree, draft.bundlesItemThreeQuantity]];
    document.querySelectorAll<HTMLElement>("#section-6 .bundle-ticket > div").forEach((row, index) => {
      const values = bundleItems[index];
      if (values) {
        const spans = row.querySelectorAll<HTMLElement>("span");
        if (spans[0]) spans[0].textContent = values[0];
        if (spans[1]) spans[1].textContent = values[1];
      } else {
        const shipping = row.querySelectorAll<HTMLElement>("span");
        if (shipping[0]) shipping[0].textContent = draft.bundlesShippingLabel;
        if (shipping[1]) shipping[1].textContent = draft.bundlesShippingValue;
      }
    });
    const points = document.querySelector<HTMLElement>("#section-6 .bundle-ticket + span");
    if (points?.firstChild) points.firstChild.textContent = draft.bundlesPointsTitle;
    const pointsDetail = points?.querySelector<HTMLElement>("small");
    if (pointsDetail) pointsDetail.textContent = draft.bundlesPointsDetail;
    const bundles = document.querySelector<HTMLElement>("#section-6");
    if (bundles) bundles.style.background = background(draft.bundlesBackgroundMode, draft.bundlesBackground, draft.bundlesBackgroundEnd, draft.bundlesGradientDirection);
    setText("#section-6 + section h2", draft.creditTitle);
    const credit = document.querySelector<HTMLElement>("#section-6 + section");
    if (credit) credit.style.background = background(draft.creditBackgroundMode, draft.creditBackground, draft.creditBackgroundEnd, draft.creditGradientDirection);
    setText("#section-5 h2", draft.qualityTitle);
    setText("#section-5 h2 + p", draft.qualityDescription);
    const qualityMetrics = [[draft.qualityMetricOneValue, draft.qualityMetricOneLabel], [draft.qualityMetricTwoValue, draft.qualityMetricTwoLabel], [draft.qualityMetricThreeValue, draft.qualityMetricThreeLabel]];
    document.querySelectorAll<HTMLElement>("#section-5 small").forEach((label, index) => {
      const metric = qualityMetrics[index];
      if (!metric) return;
      label.textContent = metric[1];
      const container = label.parentElement;
      if (container) container.replaceChildren(document.createTextNode(metric[0] + " "), label);
    });
    const proof = document.querySelector<HTMLElement>("#section-5 div.absolute b");
    if (proof) proof.textContent = draft.qualityProofTitle;
    const proofDescription = proof?.parentElement?.querySelector<HTMLElement>("p");
    if (proofDescription) proofDescription.textContent = draft.qualityProofDescription;
    const success = document.querySelector<HTMLElement>("section[class*='bg-[#e6ffe0]']");
    if (success) {
      const successTitle = success.querySelector<HTMLElement>("h2");
      if (successTitle) successTitle.textContent = draft.successTitle;
      success.querySelectorAll<HTMLElement>("article").forEach((card, index) => {
        const values = draft.successCards[index];
        if (!values) return;
        const title = card.querySelector<HTMLElement>("h3");
        const description = card.querySelector<HTMLElement>("p");
        if (title) title.textContent = values.title;
        if (description) description.textContent = values.description;
      });
      success.style.background = background(draft.successBackgroundMode, draft.successBackground, draft.successBackgroundEnd, draft.successGradientDirection);
    }
    const whyCards = document.querySelectorAll<HTMLElement>("section[class*='px-8'][class*='py-20'] article");
    const whySection = whyCards[0]?.closest("section");
    const whyTitle = whySection?.querySelector<HTMLElement>("h2");
    if (whyTitle) whyTitle.textContent = draft.whyTitle;
    whyCards.forEach((card, index) => {
      const values = draft.whyCards[index];
      if (!values) return;
      const title = card.querySelector<HTMLElement>("h3");
      const description = card.querySelector<HTMLElement>("p");
      if (title) title.textContent = values.title;
      if (description) description.textContent = values.description;
    });
    const faqButtons = document.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
    const faqSection = faqButtons[0]?.closest("section");
    const faqTitle = faqSection?.querySelector<HTMLElement>("h2");
    const faqDescription = faqTitle?.nextElementSibling as HTMLElement | null;
    if (faqTitle) faqTitle.textContent = draft.faqTitle;
    if (faqDescription) faqDescription.textContent = draft.faqDescription;
    faqButtons.forEach((button, index) => {
      const value = draft.faqItems[index];
      const textNode = Array.from(button.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (value && textNode) textNode.textContent = value;
    });
    setText("#section-7 h2", draft.footerCta);
    setButtonText("#section-7 .hero-button", draft.footerShopCta);
    setText("#section-7 > div > div:first-child > p", draft.footerDescription);
    const footer = document.querySelector<HTMLElement>("#section-7");
    if (footer) footer.style.background = background(draft.footerBackgroundMode, draft.footerBackground, draft.footerBackgroundEnd, draft.footerGradientDirection);
  }, [draft]);

  useEffect(() => {
    const receiveReady = (event: MessageEvent<{ type?: string }>) => {
      if (event.source !== iframeRef.current?.contentWindow || event.data?.type !== "mino-storefront-hydrated") return;
      const document = iframeRef.current?.contentDocument ?? null;
      if (!document) return;
      setPreviewReady(true);
      applyDraft(document);
      document.addEventListener("click", (clickEvent) => {
        const FrameElement = document.defaultView?.Element;
        const target = FrameElement && clickEvent.target instanceof FrameElement ? clickEvent.target.closest("section, footer, .sale-strip") : null;
        if (!target) return;
        const section = target.matches(".sale-strip") ? "brand" : target.id === "top" ? "hero" : target.id === "section-3" ? "guarantee" : target.id === "section-1" ? "subscription" : target.id === "section-2" ? "bulk" : target.id === "section-4" ? "club" : target.id === "section-6" ? "bundles" : target.id === "section-5" ? "quality" : target.id === "section-7" ? "footer" : target.matches("section[class*='bg-[#e6ffe0]']") ? "success" : target.querySelector("button[aria-expanded]") ? "faq" : "why";
        onSectionSelect(section);
      });
    };
    window.addEventListener("message", receiveReady);
    return () => window.removeEventListener("message", receiveReady);
  }, [applyDraft, onSectionSelect]);

  useEffect(() => {
    if (previewReady) applyDraft(iframeRef.current?.contentDocument ?? null);
  }, [applyDraft, previewReady]);

  return <div ref={previewRef} className={"relative mx-auto overflow-hidden bg-white shadow-[0_24px_60px_rgba(18,38,34,.18)] transition-all " + (viewport === "desktop" ? "w-full max-w-[1240px]" : "w-[390px] max-w-full")} style={{ height: canvasHeight * scale }}><iframe ref={iframeRef} onLoad={(event) => { setPreviewReady(false); event.currentTarget.contentWindow?.scrollTo(0, 0); }} src="/" title="Homepage preview" className="absolute left-0 top-0 border-0 bg-white" style={{ width: canvasWidth, height: canvasHeight, transform: `scale(${scale})`, transformOrigin: "top left" }} /><div className="hidden"><HomepagePreview draft={draft} viewport={viewport} /></div></div>;
}

function HomepagePreview({ draft, viewport }: { draft: HomepageDraft; viewport: Viewport }) {
  const isMobile = viewport === "mobile";
  const title = draft.heroTitle.split("\n").map((line) => <span key={line} className="block">{line}</span>);
  const cropClass = draft.guaranteePresentation === "directional-crop" ? "scale-[1.75] translate-x-[12%] -translate-y-[12%]" : "scale-100";

  return <div className="bg-white text-[#080808]">
    <div className="flex h-11 items-center justify-between px-4 text-[8px] font-bold sm:h-14 sm:px-7 sm:text-[10px]"><b className="text-sm tracking-[-.12em] text-[#10233b] sm:text-lg">amino<span className="font-normal">club</span></b>{!isMobile && <span className="text-black/65">Products　 Build a Box　 Bulk Orders　 COAs　 Membership</span>}<span>◯　▢</span></div>
    {/* <div className="flex h-8 items-center justify-center px-3 text-[7px] font-bold tracking-[.18em] text-[#ffe6a4] sm:h-10 sm:text-[9px]" style={{ background: draft.saleBackground }}>END OF SUMMER SALE　 <em className="text-[11px] sm:text-sm">35% Off Sitewide</em>　 CODE HEAT35</div> */}
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

function EditorSection({ id, active, onActivate, icon: Icon, title, children }: { id: EditorSectionId; active: boolean; onActivate: () => void; icon: typeof PencilSimpleIcon; title: string; children: ReactNode }) {
  return <section data-editor-section={id} className={(active ? "order-first " : "order-last ") + "mt-3 border-t border-black/7 pt-3 first:mt-0 first:border-t-0 first:pt-0"}><button type="button" onClick={onActivate} className={"flex w-full items-center gap-2 rounded-xl px-1 py-1.5 text-left transition-colors " + (active ? "bg-[#eff9f3] px-2" : "hover:bg-black/[.03]")}><span className="grid size-7 place-items-center rounded-lg bg-[#eef4f0] text-[#245440]"><Icon size={16} weight="bold" /></span><span className="text-sm font-bold">{title}</span><span className="ml-auto text-xs text-black/35">{active ? "Đang chỉnh" : "Chỉnh"}</span></button>{active && <div className="mt-4 grid gap-3">{children}</div>}</section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1.5 text-xs font-bold text-black/55"><span>{label}</span>{children}</label>;
}

function SelectImage({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const selectedImage = productImages.find((image) => image.value === value);
  const selectedLabel = selectedImage?.label ?? "Ảnh đã chọn";

  function selectImage(imageValue: string) {
    onChange(imageValue);
    setIsLibraryOpen(false);
  }

  return (
    <section className="rounded-2xl border border-[#cfe0d8] bg-[#f8fbf9] p-2.5 shadow-[0_12px_28px_-24px_rgba(23,60,49,.45)]">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <p className="text-[10px] font-black tracking-[.12em] text-[#315a49] uppercase">{label}</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#577368]">
          <span className="size-1.5 rounded-full bg-[#27734f]" />
          Đang chọn
        </span>
      </div>

      <button
        type="button"
        aria-expanded={isLibraryOpen}
        aria-label={`Đổi ${label}`}
        onClick={() => setIsLibraryOpen((current) => !current)}
        className="group flex w-full items-center gap-3 rounded-xl border border-[#d9e6df] bg-white p-2 text-left transition-all duration-300 hover:border-[#7da895] hover:shadow-[0_10px_22px_-18px_rgba(23,60,49,.6)] active:scale-[.98]"
      >
        <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#e8f1ec]">
          {selectedImage ? (
            <Image
              src={selectedImage.value}
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImageIcon size={24} className="text-[#628173]" />
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#173c31]/25 to-transparent" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold tracking-tight text-[#173c31]">{selectedLabel}</span>
          <span className="mt-0.5 block text-[11px] leading-4 text-[#668076]">Mở thư viện để thay ảnh</span>
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eff6f2] text-[#315a49] transition-transform duration-300 group-hover:bg-[#dcece4]">
          <CaretDownIcon size={16} weight="bold" className={isLibraryOpen ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"} />
        </span>
      </button>

      {isLibraryOpen && (
        <div className="mt-2.5 border-t border-[#dce9e2] pt-2.5">
          <div className="mb-2 flex items-center justify-between gap-2 px-1">
            <p className="text-[10px] font-bold tracking-[.1em] text-[#668076] uppercase">Thư viện ảnh</p>
            <p className="text-[10px] text-[#80978d]">Chọn một ảnh để áp dụng</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {productImages.map((image) => {
              const isSelected = image.value === value;

              return (
                <button
                  key={image.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectImage(image.value)}
                  className={
                    "group relative overflow-hidden rounded-xl border bg-white p-1.5 text-left transition-all duration-300 active:scale-[.98] " +
                    (isSelected
                      ? "border-[#27734f] ring-2 ring-[#27734f]/15"
                      : "border-[#dce7e1] hover:-translate-y-0.5 hover:border-[#8fb39f]")
                  }
                >
                  <span className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-lg bg-[#edf4f0]">
                    <Image
                      src={image.value}
                      alt=""
                      width={160}
                      height={120}
                      className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-[#27734f] text-white shadow-[0_3px_10px_rgba(23,60,49,.25)]">
                        <CheckCircleIcon size={14} weight="fill" />
                      </span>
                    )}
                  </span>
                  <span className="block truncate px-1 pb-0.5 pt-1.5 text-[11px] font-bold text-[#315a49]">{image.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const safeValue = typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : "#ffffff";
  return <label className="flex items-center justify-between rounded-xl border border-black/8 px-3 py-2.5 text-xs font-bold text-black/55"><span>{label}</span><span className="flex items-center gap-2"><span className="font-mono text-[11px] text-black/40">{safeValue}</span><input aria-label={label} type="color" value={safeValue} onChange={(event) => onChange(event.target.value)} className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent p-0" /></span></label>;
}

function GradientField({ label, mode, start, end, direction, onModeChange, onStartChange, onEndChange, onDirectionChange }: { label: string; mode: BackgroundMode; start: string; end: string; direction: GradientDirection; onModeChange: (value: BackgroundMode) => void; onStartChange: (value: string) => void; onEndChange: (value: string) => void; onDirectionChange: (value: GradientDirection) => void }) {
  const safeStart = typeof start === "string" && /^#[0-9a-f]{6}$/i.test(start) ? start : "#ffffff";
  const safeEnd = typeof end === "string" && /^#[0-9a-f]{6}$/i.test(end) ? end : "#ffffff";
  const preview = mode === "solid" ? safeStart : `linear-gradient(${direction}, ${safeStart}, ${safeEnd})`;
  return <div className="rounded-xl border border-black/8 p-3"><div className="mb-2 flex items-center justify-between gap-3"><span className="text-xs font-bold text-black/55">{label}</span><span className="h-5 w-16 rounded-full border border-black/10" style={{ background: preview }} /></div><label className="grid gap-1 text-[11px] font-bold text-black/50">Kiểu màu<select value={mode} onChange={(event) => onModeChange(event.target.value as BackgroundMode)}><option value="solid">Màu đơn sắc</option><option value="gradient">Gradient</option></select></label><div className={"mt-2 grid gap-2 " + (mode === "gradient" ? "grid-cols-2" : "grid-cols-1")}><ColorField label={mode === "gradient" ? "Từ" : "Màu nền"} value={safeStart} onChange={onStartChange} />{mode === "gradient" && <ColorField label="Đến" value={safeEnd} onChange={onEndChange} />}</div>{mode === "gradient" && <label className="mt-2 grid gap-1 text-[11px] font-bold text-black/50">Hướng gradient<select value={direction} onChange={(event) => onDirectionChange(event.target.value as GradientDirection)}><option value="to right">Trái → phải</option><option value="to bottom">Trên → dưới</option></select></label>}</div>;
}

function GuaranteeCardFields({ number, title, detail, color, onTitleChange, onDetailChange, onColorChange }: { number: string; title: string; detail: string; color: string; onTitleChange: (value: string) => void; onDetailChange: (value: string) => void; onColorChange: (value: string) => void }) {
  return <div className="grid gap-2 rounded-xl border border-black/8 bg-[#fafbfa] p-3"><p className="text-[10px] font-black tracking-[.14em] text-black/40">GUARANTEE CARD {number}</p><Field label="Tiêu đề"><input value={title ?? ""} onChange={(event) => onTitleChange(event.target.value)} /></Field><Field label="Mô tả"><input value={detail ?? ""} onChange={(event) => onDetailChange(event.target.value)} /></Field><ColorField label="Màu dải bên trái" value={color} onChange={onColorChange} /></div>;
}

function ContentCardFields({ label, title, description, onTitleChange, onDescriptionChange }: { label: string; title: string; description: string; onTitleChange: (value: string) => void; onDescriptionChange: (value: string) => void }) {
  return <div className="grid gap-2 rounded-xl border border-black/8 bg-[#fafbfa] p-3"><p className="text-[10px] font-black tracking-[.14em] text-black/40">{label}</p><Field label="Tiêu đề"><input value={title} onChange={(event) => onTitleChange(event.target.value)} /></Field><Field label="Mô tả"><textarea value={description} onChange={(event) => onDescriptionChange(event.target.value)} rows={2} /></Field></div>;
}
