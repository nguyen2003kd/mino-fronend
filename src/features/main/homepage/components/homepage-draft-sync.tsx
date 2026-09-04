"use client";

import { useEffect } from "react";

import { loadPublicHomepageDraft } from "@/features/main/homepage/services/homepage-public.service";
import { applyHomepageDraft } from "@/features/main/homepage/utils/apply-homepage-draft";

export function HomepageDraftSync() {
  useEffect(() => {
    let isMounted = true;

    void loadPublicHomepageDraft()
      .then((draft) => {
        if (isMounted && draft) {
          applyHomepageDraft(document, draft);
        }
      })
      .catch(() => {
        // The static storefront remains available when the CMS is unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
