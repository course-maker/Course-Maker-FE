import { postRegister } from "@/api/member";
import { signUpRequestDto } from "@/api/member/type";
import { PAGE_PATH } from "@/constants/pagePath";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncForUserName } = useMutation({
    mutationFn: (enteredSignupInfo: signUpRequestDto) => postRegister(enteredSignupInfo),
    onError: () => {
      alert("회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const postSignUp = async (enteredSignupInfo: signUpRequestDto) => {
    const response = await mutateAsyncForUserName(enteredSignupInfo);
    const userName = response.name;
    alert(`회원가입을 환영합니다!즐거운 여행되세요, ${userName}님.`);
    navigate(PAGE_PATH.signIn);
  };

  return { postSignUp };
};
