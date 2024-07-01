import { PAGE_PATH } from "@/constants/pagePath";
import { authState } from "@/recoil/authAtom";
import { getAccessToken } from "@/utils/manageTokenInfo";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const useAuth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp, courseRegister, destinationRegister } = PAGE_PATH;

  const authPages = [signIn, signUp];
  const registerPages = [courseRegister, destinationRegister];
  const dynamicPages = [/\/course\/[^/]+\/edit/, /\/destination\/[^/]+\/edit/];

  const isAuthPage = (path: string) => authPages.includes(path);
  const isRegisterPage = (path: string) =>
    registerPages.includes(path) || dynamicPages.some((regex) => regex.test(path));

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsAuth(!!accessToken);

    if (accessToken && isAuthPage(location.pathname)) {
      navigate("/");
    } else if (!accessToken && isRegisterPage(location.pathname)) {
      navigate(signIn);
    }
  }, [location.pathname, setIsAuth, navigate]);

  return { isAuth };
};

export default useAuth;
