import { postNickname } from "@/api/member";
import { validateNicknameRequestDto, validateNicknameResponseDto } from "@/api/member/type";

export const validateNickname = async (nickname: string) => {
  const nicknameForm: validateNicknameRequestDto = { nickname: nickname };
  const response = (await postNickname(nicknameForm)) as validateNicknameResponseDto;
  return response.isDuplicate;
};
