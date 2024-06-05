/**닉네임 중복 검사하기 */
export type validateNicknameRequestDto = { nickname: string };

export type validateNicknameResponseDto = { isDuplicate: boolean; isInappropriate: false };

/** 로그인 요청 */
export type loginRequestDto = {
  loginEmail: string;
  password: string;
};

export type loginResponseDto = {
  accessToken: string;
  refreshToken: string;
};
