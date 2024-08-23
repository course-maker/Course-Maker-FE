import { postNickname } from "@/api/member";
import { validateNicknameRequestDto } from "@/api/member/type";
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

export const validateNickname = async (nickname: string, setError: UseFormSetError<SignUpFormInputs>) => {
  const nicknameForm: validateNicknameRequestDto = { nickname: nickname };
  try {
    await postNickname(nicknameForm);
  } catch (error) {
    const axiosError = error as AxiosError;
    const duplicateErrorCode = axiosError?.response?.status;
    if (duplicateErrorCode)
      setError("nickname", {
        type: "invalid",
        message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.",
      });
    else console.error("닉네임 검증 중 오류 발생:", error);
  }
};
