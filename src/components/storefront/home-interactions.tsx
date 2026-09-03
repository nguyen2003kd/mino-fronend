"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

const tabs = ["Potency", "Purity", "Stability", "Safety", "Consistency"];
const descriptions: Record<string, string> = {
  Potency:
    "Every vial is tested to confirm the concentration stated on the label.",
  Purity:
    "Analytical review checks the target identity and expected purity threshold.",
  Stability:
    "Formulation and storage parameters are assessed for batch stability.",
  Safety: "Supporting checks screen for contaminants in the documented panel.",
  Consistency:
    "Release procedures are repeated across batches for dependable records.",
};

export function QualityTabs() {
  const [active, setActive] = useState("Potency");
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            onClick={() => setActive(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${active === tab ? "bg-black text-white shadow-md" : "bg-[#f3f3f3] text-black/55 hover:bg-black/10"}`}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-[#f7f7f7] p-5">
        <p className="font-semibold">Verified {active}</p>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {descriptions[active]}
        </p>
        <p className="mt-4 rounded-lg border-l-4 border-[#48c878] bg-white p-3 text-xs">
          <b>Why it matters:</b> documented information is available before you
          place an order.
        </p>
      </div>
    </div>
  );
}
export function FaqList({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-9 divide-y border-y">
      {items.map((item, index) => (
        <div key={item}>
          <button
            className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"
            onClick={() => setOpen(open === index ? null : index)}
            aria-expanded={open === index}
          >
            {item}
            <CaretDownIcon
              className={`shrink-0 transition-transform ${open === index ? "rotate-180" : ""}`}
              size={20}
            />
          </button>
          {open === index && (
            <p className="pb-5 text-sm leading-6 text-black/55">
              This demo answer is ready to be replaced with the product,
              compliance, or documentation content from your CMS.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
