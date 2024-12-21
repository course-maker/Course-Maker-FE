import { PropsWithChildren } from "react";

import Modal from "@/components/commons/Modal";
import NavBar from "@/components/domains/myPage/layout/NavBar";
import UserInfo from "@/components/domains/myPage/layout/UserInfo";
import { sidebarState } from "@/recoil/sidebarAtom";
import classNames from "classnames/bind";
import { useRecoilState } from "recoil";
import styles from "./MyPageLayout.module.scss";

const cx = classNames.bind(styles);

interface MyPageLayoutProps {
  selectedMenu: string;
}

const MyPageLayout = ({ selectedMenu, children }: PropsWithChildren<MyPageLayoutProps>) => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

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

      <Modal isOpen={sidebar} onBackdropClick={() => setSidebar((prev) => !prev)} isSidebar={true}>
        <aside className={cx("my-page-layout__sidebar", "mobile-view")}>
          <UserInfo />
          <NavBar />
        </aside>
      </Modal>
    </div>
  );
};
export default MyPageLayout;
