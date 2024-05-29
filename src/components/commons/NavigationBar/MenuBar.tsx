import { NavLink } from "react-router-dom";
import { NAVIGATION_BAR_MENU } from "@/constants/navigationBarMenu";

import styles from "./MenuBar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MenuBar = () => {
  return (
    <ul className={cx("menu")}>
      {Object.entries(NAVIGATION_BAR_MENU).map(([key, { title, path }]) => {
        return (
          <li key={key} className={cx("menu-item")}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                cx({
                  "menu-item-active": isActive,
                })
              }>
              {title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuBar;
