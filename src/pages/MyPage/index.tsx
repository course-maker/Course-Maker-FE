import Image from "@/components/commons/Image";
import SidebarModal from "@/components/domains/myPage/layout/SidebarModal";
import { MYPAGE_MENU_LIST } from "@/constants/mypageMenuList";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.scss";

const cx = classNames.bind(styles);

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>마이페이지</h1>
      <ul className={cx("menus")}>
        {MYPAGE_MENU_LIST.map((item) => (
          <li key={item.id} className={cx("menu")}>
            <button
              className={cx("menu-btn")}
              onClick={() => {
                navigate(item.navigate);
              }}>
              <div className={cx("menu-btn-img")}>
                <Image imageInfo={item.icon} />
              </div>
              <span className={cx("menu-btn-name")}>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <SidebarModal />
    </div>
  );
};
export default MyPage;
