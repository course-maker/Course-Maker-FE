import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/recoil/authAtom";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "@/utils/manageTokenInfo";

const useAuth = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const location = useLocation();

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsAuth(!!accessToken);
  }, [location.pathname, setIsAuth]);

  return { isAuth };
};

export default useAuth;
