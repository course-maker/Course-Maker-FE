// hooks/useNicknameValidation.ts
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { validateNickname } from "@/utils/validateSignUpElements";
import { useEffect } from "react";
import { UseFormSetError } from "react-hook-form";

export const useNicknameValidation = (
  nickname: string,
  isNicknameError: boolean,
  setError: UseFormSetError<SignUpFormInputs>,
) => {
  useEffect(() => {
    if (nickname.length > 1 && !isNicknameError) {
      const timer = setTimeout(() => {
        validateNickname(nickname, setError);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [nickname, isNicknameError, setError]);
};
