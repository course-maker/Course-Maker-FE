import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AuthListener = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const message = { type: "kakaoOAuthSuccess", code: code };
    window.opener.postMessage(message, "*");
    window.close();
  });

  return null;
};

export default AuthListener;
