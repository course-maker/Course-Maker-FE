import { IMAGES } from "@/constants/images";
import { PAGE_PATH } from "@/constants/pagePath";
import { sidebarState } from "@/recoil/sidebarAtom";
import { isMyPage } from "@/utils/pageHelpers";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Image from "../Image";
import styles from "./MobileNavigationBar.module.scss";

const cx = classNames.bind(styles);

const MobileNavigationBar = ({ isAuth }: { isAuth: boolean | null }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { signIn, myPage } = PAGE_PATH;
  const setSidebarState = useSetRecoilState(sidebarState);

  return (
    <div className={cx("nav")}>
      <button className={cx("nav__back")} onClick={() => navigate(-1)}>
        <Image imageInfo={IMAGES.grayBackIcon} />
      </button>
      <div className={cx("nav__btn")}>
        {isAuth ? (
          isMyPage(pathname) ? (
            <button onClick={() => setSidebarState((prev) => !prev)}>
              <Image imageInfo={IMAGES.grayHamburgerIcon} />
            </button>
          ) : (
            <button onClick={() => navigate(myPage)}>마이페이지</button>
          )
        ) : (
          <button onClick={() => navigate(signIn)}>로그인</button>
        )}
      </div>
    </div>
  );
};
export default MobileNavigationBar;
