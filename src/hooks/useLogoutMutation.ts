import { postLogout } from "@/api/member";
import { PAGE_PATH } from "@/constants/pagePath";
import { getRefreshToken, removeSteps, removeTokens } from "@/utils/manageTokenInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutate: logout } = useMutation({
    mutationFn: () => postLogout({ refreshToken: getRefreshToken() }),
    onSuccess: () => {
      removeTokens();
      removeSteps();
      setIsModalOpen(true);
      navigate(PAGE_PATH.home);
    },
    onError: (error: AxiosError) => {
      console.error("로그아웃 처리 중 오류가 발생했습니다.", error);
      alert("로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  return { logout, isModalOpen, setIsModalOpen };
};
