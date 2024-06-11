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
  const { signIn, signUp, courseRegister, spotRegister } = PAGE_PATH;

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsAuth(!!accessToken);

    const authPages = [signIn, signUp];
    const registerPages = [courseRegister, spotRegister];

    if (!!accessToken && authPages.includes(location.pathname)) {
      navigate("/");
    } else if (!accessToken && registerPages.includes(location.pathname)) {
      navigate(signIn);
    }
  }, [location.pathname, setIsAuth, navigate]);

  return { isAuth };
};

export default useAuth;
