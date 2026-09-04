/* eslint-disable */

/**
 * Section type
 */
export type CreateSectionDtoType = typeof CreateSectionDtoType[keyof typeof CreateSectionDtoType];


export const CreateSectionDtoType = {
  HERO: 'HERO',
  COMPANY_INTRO: 'COMPANY_INTRO',
  WHY_CHOOSE_US: 'WHY_CHOOSE_US',
  FEATURED_PRODUCTS: 'FEATURED_PRODUCTS',
  FEATURED_BUNDLES: 'FEATURED_BUNDLES',
  QUALITY_PROOF: 'QUALITY_PROOF',
  RESEARCH_LIBRARY: 'RESEARCH_LIBRARY',
  CTA: 'CTA',
  CUSTOM: 'CUSTOM',
} as const;
