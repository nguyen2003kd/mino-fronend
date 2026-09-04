/* eslint-disable */

export interface MediaResponseDto {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  url: string;
  storageKey: string;
  width?: number;
  height?: number;
  alt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}
