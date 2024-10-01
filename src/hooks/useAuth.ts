import { getBasicInfo } from "@/api/my";
import { PAGE_PATH } from "@/constants/pagePath";
import { authState } from "@/recoil/authAtom";
import { getAccessToken } from "@/utils/manageTokenInfo";
import { isRegisterPage, isSignPage } from "@/utils/pageHelpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const {
    data: userInfo,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getBasicInfo,
    // enabled: !!accessToken,
  });

  useEffect(() => {
    if (!accessToken || isError) {
      setAuth(null);
    } else if (isSuccess && userInfo) {
      setAuth(userInfo);
    }

    if (accessToken && isSignPage(location.pathname)) {
      navigate("/");
    } else if (!accessToken && isRegisterPage(location.pathname)) {
      navigate(PAGE_PATH.signIn, { replace: true });
    }
  }, [accessToken, isSuccess, userInfo, location.pathname, navigate, setAuth]);

  return { auth };
};

export default useAuth;
