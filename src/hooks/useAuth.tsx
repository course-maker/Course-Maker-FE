import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/recoil/authAtom";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "@/utils/manageTokenInfo";
import { PAGE_PATH } from "@/constants/pagePath";

const useAuth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp } = PAGE_PATH;

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsAuth(!!accessToken);

    const authPages = [signIn, signUp];
    if (!!accessToken && authPages.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname, setIsAuth, navigate]);

  return { isAuth };
};

export default useAuth;
