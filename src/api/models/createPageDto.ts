/* eslint-disable */

export interface CreatePageDto {
  /**
     * Unique page key
     * @maxLength 100
     */
  key: string;
  /**
     * Page display name
     * @maxLength 100
     */
  name: string;
  /** Active status */
  isActive?: boolean;
}
