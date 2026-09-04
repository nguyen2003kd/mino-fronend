/* eslint-disable */
import type { CreateSectionDtoContent } from './createSectionDtoContent';
import type { CreateSectionDtoSettings } from './createSectionDtoSettings';
import type { CreateSectionDtoType } from './createSectionDtoType';

export interface CreateSectionDto {
  /**
     * Unique section key
     * @maxLength 100
     */
  key: string;
  /** Section type */
  type: CreateSectionDtoType;
  /** Section content JSON object */
  content: CreateSectionDtoContent;
  /** Optional display settings JSON */
  settings?: CreateSectionDtoSettings;
  /** Sort order */
  sortOrder?: number;
  /** Active status */
  isActive?: boolean;
}
