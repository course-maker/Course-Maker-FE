import { useSetRecoilState } from "recoil";
import { authState } from "@/recoil/authAtom";
import { postLogout } from "@/api/member";
import { removeTokens } from "@/utils/manageTokenInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogoutMutation = () => {
  const setIsAuth = useSetRecoilState(authState);

  const { mutate: logout } = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      removeTokens();
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
