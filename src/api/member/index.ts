import { memberAddress } from "../address";
import { apiRequest } from "../axios";
import {
  deleteRequestDto,
  deleteResponseDto,
  loginRequestDto,
  loginResponseDto,
  logoutRequestDto,
  logoutResponseDto,
  signUpRequestDto,
  signUpResponseDto,
  validateCodeRequestDto,
  validateEmailRequestDto,
  validateNicknameRequestDto,
} from "./type";

/**닉네임 중복 검사하기*/
export const postNickname = (data: validateNicknameRequestDto) =>
  apiRequest("post", memberAddress.validateNickname, data);

/**이메일 중복 검사하기*/
export const postEmail = (data: validateEmailRequestDto) => apiRequest("post", memberAddress.validateEmail, data);

/**인증 코드 검증하기*/
export const postCode = (data: validateCodeRequestDto) => apiRequest("post", memberAddress.validateCode, data);

/** 로그인 요청 */
export const postLogin = (data: loginRequestDto): Promise<loginResponseDto> =>
  apiRequest("post", memberAddress.login, data);

/** 회원가입 요청 */
export const postRegister = (data: signUpRequestDto): Promise<signUpResponseDto> =>
  apiRequest("post", memberAddress.signUp, data);

/** 로그아웃 요청 */
export const postLogout = (data: logoutRequestDto): Promise<logoutResponseDto> =>
  apiRequest("post", memberAddress.logout, data);

/** 회원탈퇴 요청 */
export const postDelete = (data: deleteRequestDto): Promise<deleteResponseDto> =>
  apiRequest("delete", memberAddress.delete, data);
