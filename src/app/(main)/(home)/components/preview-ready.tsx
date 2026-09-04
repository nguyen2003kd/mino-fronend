"use client";

import { useEffect } from "react";

export function StorefrontPreviewReady() {
  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "mino-storefront-hydrated" }, window.location.origin);
    }
  }, []);

  return null;
}
