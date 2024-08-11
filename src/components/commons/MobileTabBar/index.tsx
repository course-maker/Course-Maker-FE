import { NAVIGATION_BAR_MENU } from "@/constants/navigationBarMenu";
import { NavLink } from "react-router-dom";

import classNames from "classnames/bind";
import Image from "../Image";
import styles from "./MobileTabBar.module.scss";

const cx = classNames.bind(styles);

const MobileTabBar = () => {
  return (
    <ul className={cx("menu")}>
      {Object.entries(NAVIGATION_BAR_MENU).map(([key, { tabTitle, path, tabImage }]) => {
        return (
          <li key={key} className={cx("menu-item")}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                cx({
                  "menu-item-active": isActive,
                })
              }>
              <Image imageInfo={tabImage} />
              <div>{tabTitle}</div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default MobileTabBar;
