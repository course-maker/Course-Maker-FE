import styles from "./Oauth.module.scss";
import classNames from "classnames/bind";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

const Oauth = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("divider")}>간편 로그인/회원가입</div>
      <button type="button" className={cx("btn")}>
        {/*fix: Image 컴포넌트로 변경하기*/}
        <img src={IMAGES.kakaoOauthButton.src} alt={IMAGES.kakaoOauthButton.alt} />
      </button>
    </div>
  );
};

export default Oauth;
