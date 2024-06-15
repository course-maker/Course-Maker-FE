import { kakaoLogin } from "@/api/oauth";
import { PAGE_PATH } from "@/constants/pagePath";
import { saveAccessToken, saveRefreshToken } from "@/utils/manageTokenInfo";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useOauthSignInMutation = () => {
  const navigate = useNavigate();

  const { mutate: kakaoSignIn } = useMutation({
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: (data) => {
      saveAccessToken(data.accessToken);
      saveRefreshToken(data.refreshToken);
      alert(`안녕하세요, 오늘도 즐거운 여행되세요`);
      navigate(PAGE_PATH.home);
    },
    onError: () => {
      alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return { kakaoSignIn };
};
