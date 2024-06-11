/**닉네임 중복 검사하기 */
export type validateNicknameRequestDto = { nickname: string };

export type validateNicknameResponseDto = { isDuplicate: boolean; isInappropriate: false };

/**이메일 중복 검사하기 */
export type validateEmailRequestDto = { email: string };

export type validateEmailResponseDto = {
  fromMail: string;
  toMail: string;
  title: string;
  authCode: string;
  isDuplicate: boolean;
  isInappropriate: boolean;
};

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
  email: string;
  name: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  profileImgUrl: string;
  profileDescription: string;
};

/** 로그아웃 요청 */
export type logoutResponseDto = {
  success: boolean;
};
