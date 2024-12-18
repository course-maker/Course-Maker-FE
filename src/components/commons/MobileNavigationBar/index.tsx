import { IMAGES } from "@/constants/images";
import { PAGE_PATH } from "@/constants/pagePath";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Image";
import styles from "./MobileNavigationBar.module.scss";

const cx = classNames.bind(styles);

const MobileNavigationBar = ({ isAuth }: { isAuth: boolean | null }) => {
  const navigate = useNavigate();
  const { signIn } = PAGE_PATH;

  return (
    <div className={cx("nav")}>
      <Link className={cx("nav-logo")} to={PAGE_PATH.home}>
        <Image imageInfo={IMAGES.courseMakerLogoMobile} />
      </Link>
      <div className={cx("nav-btn")}>
        {/* {isAuth ? <button>마이페이지</button> : <button onClick={() => navigate(signIn)}>로그인</button>} */}
        {!isAuth && <button onClick={() => navigate(signIn)}>로그인</button>}
      </div>
    </div>
  );
};
export default MobileNavigationBar;
