import { MYPAGE_MENU_LIST } from "@/constants/mypageMenuList";
import { NavLink } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./NavBar.module.scss";

const cx = classNames.bind(styles);

const NavBar = () => {
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
                }>
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
