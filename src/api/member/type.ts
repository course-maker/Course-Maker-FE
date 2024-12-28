/**닉네임 중복 검사하기 */
export type validateNicknameRequestDto = { nickname: string };

/**이메일 중복 검사하기 */
export type validateEmailRequestDto = { email: string };

/**인증 코드 검증하기*/
export type validateCodeRequestDto = { email: string; code: string };

/** 로그인 요청 */
export type loginRequestDto = {
  loginEmail: string;
  password: string;
};

export type loginResponseDto = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
};

/** 회원가입 요청 */
export type signUpRequestDto = {
  email: string;
  name: string;
  nickname: string;
  password: string;
  phoneNumber: string;
};

export type signUpResponseDto = {
  nickname: string;
};

/** 로그아웃 요청 */
export type logoutRequestDto = {
  refreshToken: string;
};

export type logoutResponseDto = {
  success: boolean;
};

/** 회원탈퇴 요청 */
export type deleteRequestDto = {
  refreshToken: string;
};

export type deleteResponseDto = {
  success: boolean;
};
