/* eslint-disable */
import type { PublicSectionDtoContent } from './publicSectionDtoContent';

export interface PublicSectionDto {
  key: string;
  type: string;
  sortOrder: number;
  /** Resolved section content with media URLs */
  content: PublicSectionDtoContent;
}
