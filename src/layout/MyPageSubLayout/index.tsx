import { PropsWithChildren } from "react";

import Sidebar from "@/components/domains/myPage/layout/Sidebar";

import SidebarModal from "@/components/domains/myPage/layout/SidebarModal";
import classNames from "classnames/bind";
import styles from "./MyPageSubLayout.module.scss";

const cx = classNames.bind(styles);

interface MyPageSubLayoutProps {
  selectedMenu: string;
}

const MyPageSubLayout = ({ selectedMenu, children }: PropsWithChildren<MyPageSubLayoutProps>) => {
  return (
    <div className={cx("my-page-layout")}>
      <h1 className={cx("my-page-layout__heading")}>
        MYPAGE <span className={cx("my-page-layout__heading-selectedMenu")}>/ {selectedMenu}</span>
      </h1>
      <aside className={cx("my-page-layout__sidebar")}>
        <Sidebar />
      </aside>
      <main className={cx("my-page-layout__main")}>{children}</main>

      <SidebarModal />
    </div>
  );
};
export default MyPageSubLayout;
