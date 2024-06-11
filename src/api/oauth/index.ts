import { oauthAddress } from "../address";
import { apiRequest } from "../axios";
import { loginResponseDto } from "../member/type";

export const kakaoLogin = (code: string): Promise<loginResponseDto> =>
  apiRequest("post", oauthAddress.kakao.redirect(code));
