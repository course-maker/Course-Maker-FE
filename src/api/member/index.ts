import { memberAddress } from "../address";
import { apiRequest } from "../axios";
import { loginRequestDto, loginResponseDto, validateNicknameRequestDto } from "./type";

/**닉네임 중복 검사하기*/
export const postNickname = (data: validateNicknameRequestDto) =>
  apiRequest("post", memberAddress.validateNickname, data);

/** 로그인 요청 */
export const postLogin = (data: loginRequestDto): Promise<loginResponseDto> =>
  apiRequest("post", memberAddress.login, data);
