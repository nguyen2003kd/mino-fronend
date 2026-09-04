type HomepageDraft = Record<string, unknown>;

const getText = (draft: HomepageDraft, key: string): string | undefined =>
  typeof draft[key] === "string" ? draft[key] : undefined;

const getItems = (draft: HomepageDraft, key: string): Record<string, unknown>[] =>
  Array.isArray(draft[key])
    ? draft[key].filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null,
      )
    : [];

const getBackground = (
  draft: HomepageDraft,
  prefix: string,
): string | undefined => {
  const start = getText(draft, `${prefix}Background`);
  const end = getText(draft, `${prefix}BackgroundEnd`);
  const mode = getText(draft, `${prefix}BackgroundMode`);
  const direction = getText(draft, `${prefix}GradientDirection`);

  if (!start) return undefined;
  if (mode === "solid") return start;
  if (!end || (direction !== "to right" && direction !== "to bottom")) {
    return undefined;
  }

  return `linear-gradient(${direction}, ${start} 0%, ${end} 100%)`;
};

export function applyHomepageDraft(document: Document, draft: HomepageDraft) {
  const setText = (selector: string, value: string | undefined) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element && value !== undefined) element.textContent = value;
  };
  const setMultilineText = (selector: string, value: string | undefined) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element || value === undefined) return;
    element.replaceChildren();
    value.split("\n").forEach((line, index) => {
      if (index) element.append(document.createElement("br"));
      element.append(document.createTextNode(line));
    });
  };
  const setButtonText = (selector: string, value: string | undefined) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element?.firstChild && value !== undefined) {
      element.firstChild.textContent = `${value} `;
    }
  };
  const setBackground = (selector: string, prefix: string) => {
    const element = document.querySelector<HTMLElement>(selector);
    const background = getBackground(draft, prefix);
    if (element && background) element.style.background = background;
  };

  setMultilineText("#top h1", getText(draft, "heroTitle"));
  setText("#top h1 + p", getText(draft, "heroDescription"));
  setButtonText("#top .hero-button", getText(draft, "heroCta"));
  setBackground("#top > div:first-child > div:last-child", "hero");
  setBackground(".sale-strip", "sale");

  setText("#section-3 h2", getText(draft, "guaranteeTitle"));
  setText("#section-3 h2 + p", getText(draft, "guaranteeDescription"));
  setBackground(".guarantee-visual", "guarantee");
  const guaranteeImage = document.querySelector<HTMLImageElement>(".guarantee-visual img");
  const guaranteeImageSource = getText(draft, "guaranteeImage");
  if (guaranteeImage && guaranteeImageSource) guaranteeImage.src = guaranteeImageSource;
  const guaranteeCards = [
    ["guaranteeCardOneColor", "guaranteeCardOneTitle", "guaranteeCardOneDetail"],
    ["guaranteeCardTwoColor", "guaranteeCardTwoTitle", "guaranteeCardTwoDetail"],
    ["guaranteeCardThreeColor", "guaranteeCardThreeTitle", "guaranteeCardThreeDetail"],
  ];
  document.querySelectorAll<HTMLElement>("#section-3 article").forEach((card, index) => {
    const keys = guaranteeCards[index];
    if (!keys) return;
    const [colorKey, titleKey, detailKey] = keys;
    const color = getText(draft, colorKey);
    const stripe = card.querySelector<HTMLElement>(":scope > span");
    const circle = card.querySelector<HTMLElement>(":scope > span + span");
    if (color && stripe) stripe.style.background = color;
    if (color && circle) circle.style.background = color;
    const text = card.querySelectorAll<HTMLElement>("p");
    if (text[0]) setTextValue(text[0], getText(draft, titleKey));
    if (text[1]) setTextValue(text[1], getText(draft, detailKey));
  });

  setText("#section-1 h2", getText(draft, "subscriptionTitle"));
  setText("#section-1 h2 + p", getText(draft, "subscriptionDescription"));
  setButtonText("#section-1 .hero-button", getText(draft, "subscriptionCta"));
  const subscriptionHeader = document.querySelectorAll<HTMLElement>("#section-1 .subscription-card > div:first-child > span");
  setTextValue(subscriptionHeader[0], getText(draft, "subscriptionBoxTitle"));
  setTextValue(subscriptionHeader[1], getText(draft, "subscriptionBoxBadge"));
  const subscriptionImages = ["subscriptionBoxImageOne", "subscriptionBoxImageTwo", "subscriptionBoxImageThree", "subscriptionBoxImageFour"];
  document.querySelectorAll<HTMLImageElement>("#section-1 .subscription-card > div:nth-child(2) img").forEach((image, index) => {
    const source = getText(draft, subscriptionImages[index] ?? "");
    if (source) {
      image.srcset = "";
      image.src = source;
    }
  });
  const benefits = ["subscriptionBenefitOne", "subscriptionBenefitTwo", "subscriptionBenefitThree", "subscriptionBenefitFour"];
  document.querySelectorAll<HTMLElement>("#section-1 ul li").forEach((item, index) => {
    const value = getText(draft, benefits[index] ?? "");
    const textNode = Array.from(item.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (value && textNode) textNode.textContent = value;
  });
  setBackground("#section-1", "subscription");

  setText("#section-2 h2", getText(draft, "bulkTitle"));
  setText("#section-2 h2 + p", getText(draft, "bulkDescription"));
  setButtonText("#section-2 .hero-button", getText(draft, "bulkCta"));
  const bulkCard = document.querySelector<HTMLElement>("[data-bulk-product-card]");
  if (bulkCard) {
    const labels = bulkCard.querySelectorAll<HTMLElement>("b");
    setTextValue(labels[0], getText(draft, "bulkProductTitle"));
    setTextValue(labels[1], getText(draft, "bulkProductPrice"));
    setTextValue(bulkCard.querySelector<HTMLElement>("p"), getText(draft, "bulkProductDetail"));
    const image = bulkCard.querySelector<HTMLImageElement>("img");
    const source = getText(draft, "bulkProductImage");
    if (image && source) {
      image.srcset = "";
      image.src = source;
    }
  }
  const rainImages = ["bulkRainImageOne", "bulkRainImageTwo", "bulkRainImageThree", "bulkRainImageFour"];
  document.querySelectorAll<HTMLImageElement>("#section-2 .rain-vial").forEach((image, index) => {
    const source = getText(draft, rainImages[index % rainImages.length]);
    if (source) {
      image.srcset = "";
      image.src = source;
    }
  });
  setBackground("#section-2", "bulk");

  setText("#section-4 h2", getText(draft, "clubTitle"));
  setText("#section-4 h2 + p", getText(draft, "clubDescription"));
  setButtonText("#section-4 .button-light", getText(draft, "clubCta"));
  setBackground("#section-4", "club");

  setText("#section-6 h2", getText(draft, "bundlesTitle"));
  setText("#section-6 h2 + p", getText(draft, "bundlesDescription"));
  setText("#section-6 a", getText(draft, "bundlesCta"));
  setText("#section-6 .bundle-ticket > p", getText(draft, "bundlesCardLabel"));
  setText("#section-6 .bundle-ticket > h3", getText(draft, "bundlesCardTitle"));
  const bundleItems = [
    ["bundlesItemOne", "bundlesItemOneQuantity"],
    ["bundlesItemTwo", "bundlesItemTwoQuantity"],
    ["bundlesItemThree", "bundlesItemThreeQuantity"],
  ];
  document.querySelectorAll<HTMLElement>("#section-6 .bundle-ticket > div").forEach((row, index) => {
    const values = bundleItems[index];
    const spans = row.querySelectorAll<HTMLElement>("span");
    if (values) {
      setTextValue(spans[0], getText(draft, values[0]));
      setTextValue(spans[1], getText(draft, values[1]));
    } else {
      setTextValue(spans[0], getText(draft, "bundlesShippingLabel"));
      setTextValue(spans[1], getText(draft, "bundlesShippingValue"));
    }
  });
  const points = document.querySelector<HTMLElement>("#section-6 .bundle-ticket + span");
  if (points?.firstChild) {
    const title = getText(draft, "bundlesPointsTitle");
    if (title) points.firstChild.textContent = title;
  }
  setText("#section-6 .bundle-ticket + span small", getText(draft, "bundlesPointsDetail"));
  setBackground("#section-6", "bundles");
  setText("#section-6 + section h2", getText(draft, "creditTitle"));
  setBackground("#section-6 + section", "credit");

  setText("#section-5 h2", getText(draft, "qualityTitle"));
  setText("#section-5 h2 + p", getText(draft, "qualityDescription"));
  const qualityMetrics = [
    ["qualityMetricOneValue", "qualityMetricOneLabel"],
    ["qualityMetricTwoValue", "qualityMetricTwoLabel"],
    ["qualityMetricThreeValue", "qualityMetricThreeLabel"],
  ];
  document.querySelectorAll<HTMLElement>("#section-5 small").forEach((label, index) => {
    const metric = qualityMetrics[index];
    if (!metric) return;
    const value = getText(draft, metric[0]);
    const labelText = getText(draft, metric[1]);
    if (!value || !labelText || !label.parentElement) return;
    label.textContent = labelText;
    label.parentElement.replaceChildren(document.createTextNode(`${value} `), label);
  });
  setText("#section-5 div.absolute b", getText(draft, "qualityProofTitle"));
  setText("#section-5 div.absolute b + p", getText(draft, "qualityProofDescription"));

  const success = document.querySelector<HTMLElement>("section[class*='bg-[#e6ffe0]']");
  if (success) {
    setTextValue(success.querySelector<HTMLElement>("h2"), getText(draft, "successTitle"));
    getItems(draft, "successCards").forEach((values, index) => {
      const card = success.querySelectorAll<HTMLElement>("article")[index];
      if (!card) return;
      setTextValue(card.querySelector<HTMLElement>("h3"), getText(values, "title"));
      setTextValue(card.querySelector<HTMLElement>("p"), getText(values, "description"));
    });
    const background = getBackground(draft, "success");
    if (background) success.style.background = background;
  }
  const whyCards = document.querySelectorAll<HTMLElement>("section[class*='px-8'][class*='py-20'] article");
  const whySection = whyCards[0]?.closest("section");
  setTextValue(whySection?.querySelector<HTMLElement>("h2"), getText(draft, "whyTitle"));
  getItems(draft, "whyCards").forEach((values, index) => {
    const card = whyCards[index];
    if (!card) return;
    setTextValue(card.querySelector<HTMLElement>("h3"), getText(values, "title"));
    setTextValue(card.querySelector<HTMLElement>("p"), getText(values, "description"));
  });
  const faqButtons = document.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
  const faqSection = faqButtons[0]?.closest("section");
  const faqTitle = faqSection?.querySelector<HTMLElement>("h2");
  setTextValue(faqTitle, getText(draft, "faqTitle"));
  setTextValue(faqTitle?.nextElementSibling as HTMLElement | null, getText(draft, "faqDescription"));
  const faqItems = Array.isArray(draft.faqItems) ? draft.faqItems : [];
  faqButtons.forEach((button, index) => {
    const value = faqItems[index];
    const textNode = Array.from(button.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (typeof value === "string" && textNode) textNode.textContent = value;
  });

  setText("#section-7 h2", getText(draft, "footerCta"));
  setButtonText("#section-7 .hero-button", getText(draft, "footerShopCta"));
  setText("#section-7 > div > div:first-child > p", getText(draft, "footerDescription"));
  setBackground("#section-7", "footer");
}

function setTextValue(element: HTMLElement | undefined | null, value: string | undefined) {
  if (element && value !== undefined) element.textContent = value;
}
