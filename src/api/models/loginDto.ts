/* eslint-disable */

export interface LoginDto {
  /** Registered email address */
  email: string;
  /**
     * User password
     * @minLength 6
     */
  password: string;
}
