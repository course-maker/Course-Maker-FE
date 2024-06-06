import { postNickname } from "@/api/member";
import { validateNicknameRequestDto } from "@/api/member/type";

export const validateNickname = async (nickname: string) => {
  const nicknameForm: validateNicknameRequestDto = { nickname: nickname };
  try {
    const response = await postNickname(nicknameForm);
    return response.isDuplicate;
  } catch (error) {
    console.error("닉네임 검증 중 오류 발생:", error);
  }
};
