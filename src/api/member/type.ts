/**닉네임 중복 검사하기 */
export type validateNicknameRequestDto = { nickname: string };

export type validateNicknameResponseDto = { isDuplicate: boolean; isInappropriate: false };
