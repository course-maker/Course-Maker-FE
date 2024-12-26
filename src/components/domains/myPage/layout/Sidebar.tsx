import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { sidebarState } from "@/recoil/sidebarAtom";
import { useSetRecoilState } from "recoil";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

export default function Sidebar() {
  const setSidebar = useSetRecoilState(sidebarState);

  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebar__top-bar")}>
        <button className={cx("sidebar__top-bar--close-btn")} onClick={() => setSidebar((prev) => !prev)}>
          <Image imageInfo={IMAGES.modalClose} />
        </button>
      </div>
      <div className={cx("sidebar__menu")}>
        <UserInfo />
        <NavBar />
      </div>
    </div>
  );
}
