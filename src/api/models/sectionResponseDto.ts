/* eslint-disable */
import type { SectionResponseDtoContent } from './sectionResponseDtoContent';
import type { SectionResponseDtoSettings } from './sectionResponseDtoSettings';

export interface SectionResponseDto {
  id: string;
  pageId: string;
  key: string;
  type: string;
  content: SectionResponseDtoContent;
  settings: SectionResponseDtoSettings;
  sortOrder: number;
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}
