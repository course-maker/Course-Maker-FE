import { getBasicInfo } from "@/api/my";
import { PAGE_PATH } from "@/constants/pagePath";
import { authState } from "@/recoil/authAtom";
import { getAccessToken } from "@/utils/manageTokenInfo";
import { isMyPage, isRegisterPage, isSignPage } from "@/utils/pageHelpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const {
    data: userInfo,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getBasicInfo,
    enabled: !!accessToken,
    retry: 0,
  });

  useEffect(() => {
    if (!accessToken || isError) {
      setAuth(null);
    } else if (isSuccess && userInfo) {
      setAuth(userInfo);
    }

    if (accessToken && isSignPage(pathname)) {
      navigate("/");
    } else if (!accessToken && (isRegisterPage(pathname) || isMyPage(pathname))) {
      navigate(PAGE_PATH.signIn, { replace: true });
    }
  }, [accessToken, isSuccess, userInfo, pathname, navigate, setAuth]);

  return { auth, isLoading };
};

export default useAuth;
