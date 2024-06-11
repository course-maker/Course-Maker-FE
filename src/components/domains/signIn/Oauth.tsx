import { useEffect } from "react";

import styles from "./Oauth.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/commons/Image";
import openOauthPopup from "@/utils/openOauthPopup";
import { IMAGES } from "@/constants/images";
import { oauthAddress } from "@/api/address";
import { useOauthSignInMutation } from "@/hooks/useOauthSignInMutation";

const cx = classNames.bind(styles);

const Oauth = () => {
  const { kakaoSignIn } = useOauthSignInMutation();

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if (e.data && e.data.type === "kakaoOAuthSuccess") {
        await kakaoSignIn(e.data.code);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("divider")}>간편 로그인/회원가입</div>
      <button type="button" className={cx("btn")} onClick={() => openOauthPopup(oauthAddress.kakao.login)}>
        <Image imageInfo={IMAGES.kakaoOauthButton} />
      </button>
    </div>
  );
};

export default Oauth;
