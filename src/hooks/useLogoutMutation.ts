import { postLogout } from "@/api/member";
import { authState } from "@/recoil/authAtom";
import { getRefreshToken, removeSteps, removeTokens } from "@/utils/manageTokenInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";

export const useLogoutMutation = () => {
  const setIsAuth = useSetRecoilState(authState);

  const { mutate: logout } = useMutation({
    mutationFn: () => postLogout({ refreshToken: getRefreshToken() }),
    onSuccess: () => {
      removeTokens();
      removeSteps();
      setIsAuth(false);
      alert("성공적으로 로그아웃 되었습니다.");
    },
    onError: (error: AxiosError) => {
      console.error("로그아웃 처리 중 오류가 발생했습니다.", error);
      alert("로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  return { logout };
};
