/* eslint-disable */
import type { PageDetailDto } from './pageDetailDto';
import type { SectionResponseDto } from './sectionResponseDto';

export interface SectionsResponseDto {
  page: PageDetailDto;
  sections: SectionResponseDto[];
}
