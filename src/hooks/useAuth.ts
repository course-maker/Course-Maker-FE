import { PAGE_PATH } from "@/constants/pagePath";
import { authState } from "@/recoil/authAtom";
import { getAccessToken } from "@/utils/manageTokenInfo";
import { isRegisterPage, isSignPage } from "@/utils/pageHelpers";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsAuth(!!accessToken);

    if (accessToken && isSignPage(location.pathname)) {
      navigate("/");
    } else if (!accessToken && isRegisterPage(location.pathname)) {
      navigate(PAGE_PATH.signIn);
    }
  }, [location.pathname, setIsAuth, navigate]);

  return { isAuth };
};

export default useAuth;
