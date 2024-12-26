import { MYPAGE_MENU_LIST } from "@/constants/mypageMenuList";
import { NavLink } from "react-router-dom";

import { sidebarState } from "@/recoil/sidebarAtom";
import classNames from "classnames/bind";
import { useSetRecoilState } from "recoil";
import { useWindowSize } from "usehooks-ts";
import styles from "./NavBar.module.scss";

const cx = classNames.bind(styles);

const NavBar = () => {
  const setSidebar = useSetRecoilState(sidebarState);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 1200;

  return (
    <section className={cx("nav")}>
      <ul className={cx("nav__list")}>
        {MYPAGE_MENU_LIST.map(({ id, name, navigate }) => {
          return (
            <li key={id} className={cx("nav__list-item")}>
              <NavLink
                to={navigate}
                className={({ isActive }) =>
                  cx({
                    "nav__list-item--active": isActive,
                  })
                }
                onClick={() => {
                  if (isMobile) {
                    setSidebar((prev) => !prev);
                  }
                }}>
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default NavBar;
