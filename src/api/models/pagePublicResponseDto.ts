/* eslint-disable */
import type { PageInfoDto } from './pageInfoDto';
import type { PublicSectionDto } from './publicSectionDto';

export interface PagePublicResponseDto {
  page: PageInfoDto;
  sections: PublicSectionDto[];
}
