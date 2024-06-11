import { memberAddress } from "../address";
import { apiRequest } from "../axios";
import {
  loginRequestDto,
  loginResponseDto,
  logoutResponseDto,
  signUpRequestDto,
  signUpResponseDto,
  validateEmailRequestDto,
  validateEmailResponseDto,
  validateNicknameRequestDto,
  validateNicknameResponseDto,
} from "./type";

/**닉네임 중복 검사하기*/
export const postNickname = (data: validateNicknameRequestDto): Promise<validateNicknameResponseDto> =>
  apiRequest("post", memberAddress.validateNickname, data);

/**이메일 중복 검사하기*/
export const postEmail = (data: validateEmailRequestDto): Promise<validateEmailResponseDto> =>
  apiRequest("post", memberAddress.validateEmail, data);

/** 로그인 요청 */
export const postLogin = (data: loginRequestDto): Promise<loginResponseDto> =>
  apiRequest("post", memberAddress.login, data);

/** 회원가입 요청 */
export const postRegister = (data: signUpRequestDto): Promise<signUpResponseDto> =>
  apiRequest("post", memberAddress.signUp, data);

/** 로그아웃 요청 */
export const postLogout = (): Promise<logoutResponseDto> => apiRequest("post", memberAddress.logout);
