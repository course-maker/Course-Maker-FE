import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginRequestDto } from "@/api/member/type";
import { postLogin } from "@/api/member";
import { saveAccessToken, saveRefreshToken } from "@/utils/manageTokenInfo";
import { MODALS } from "@/constants/modals";
import { useState } from "react";
import { PAGE_PATH } from "@/constants/pagePath";
import { AxiosError } from "axios";

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const { mutate: signIn } = useMutation({
    mutationFn: (enteredSignInInfo: loginRequestDto) => postLogin(enteredSignInInfo),
    onSuccess: (data) => {
      saveAccessToken(data.accessToken);
      saveRefreshToken(data.refreshToken);
      alert(`안녕하세요, ${data.nickname}님. 오늘도 즐거운 여행되세요`);
      navigate(PAGE_PATH.home);
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 401:
          setCurrentModal(MODALS.invalidPassword.id);
          break;
        case 404:
          setCurrentModal(MODALS.invalidEmail.id);
          break;
        default:
          alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return { signIn, currentModal, setCurrentModal };
};
