import { PropsWithChildren } from "react";

import NavBar from "@/components/domains/myPage/layout/NavBar";
import UserInfo from "@/components/domains/myPage/layout/UserInfo";
import classNames from "classnames/bind";
import styles from "./MyPageLayout.module.scss";

const cx = classNames.bind(styles);

interface MyPageLayoutProps {
  selectedMenu: string;
}

const MyPageLayout = ({ selectedMenu, children }: PropsWithChildren<MyPageLayoutProps>) => {
  return (
    <div className={cx("my-page-layout")}>
      <h1 className={cx("my-page-layout__heading")}>
        MYPAGE <span className={cx("my-page-layout__heading-selectedMenu")}>/ {selectedMenu}</span>
      </h1>
      <aside className={cx("my-page-layout__sidebar")}>
        <UserInfo />
        <NavBar />
      </aside>
      <main className={cx("my-page-layout__main")}>{children}</main>
    </div>
  );
};
export default MyPageLayout;
