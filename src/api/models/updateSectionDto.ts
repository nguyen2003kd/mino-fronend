/* eslint-disable */
import type { UpdateSectionDtoContent } from './updateSectionDtoContent';
import type { UpdateSectionDtoSettings } from './updateSectionDtoSettings';

export interface UpdateSectionDto {
  /** Section content JSON object */
  content?: UpdateSectionDtoContent;
  /** Optional display settings JSON */
  settings?: UpdateSectionDtoSettings;
}
