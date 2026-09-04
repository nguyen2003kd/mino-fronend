/* eslint-disable */

export interface RegisterDto {
  /** User email address */
  email: string;
  /**
     * Password (6-50 chars)
     * @minLength 6
     * @maxLength 50
     */
  password: string;
  /**
     * User full name
     * @maxLength 100
     */
  name: string;
}
