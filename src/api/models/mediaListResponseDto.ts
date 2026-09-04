/* eslint-disable */
import type { MediaResponseDto } from './mediaResponseDto';

export interface MediaListResponseDto {
  items: MediaResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
