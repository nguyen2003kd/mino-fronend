/* eslint-disable */
import type { UserInfoDto } from './userInfoDto';

export interface AuthResponseDto {
  user: UserInfoDto;
  /** JWT access token */
  accessToken: string;
}
