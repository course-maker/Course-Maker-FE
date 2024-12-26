import { PropsWithChildren } from "react";

import Modal from "@/components/commons/Modal";
import Sidebar from "@/components/domains/myPage/layout/Sidebar";
import { sidebarState } from "@/recoil/sidebarAtom";
import { useRecoilState } from "recoil";

import classNames from "classnames/bind";
import { useWindowSize } from "usehooks-ts";
import styles from "./MyPageLayout.module.scss";

const cx = classNames.bind(styles);

interface MyPageLayoutProps {
  selectedMenu: string;
}

const MyPageLayout = ({ selectedMenu, children }: PropsWithChildren<MyPageLayoutProps>) => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 1200;

  return (
    <div className={cx("my-page-layout")}>
      <h1 className={cx("my-page-layout__heading")}>
        MYPAGE <span className={cx("my-page-layout__heading-selectedMenu")}>/ {selectedMenu}</span>
      </h1>
      <aside className={cx("my-page-layout__sidebar")}>
        <Sidebar />
      </aside>
      <main className={cx("my-page-layout__main")}>{children}</main>

      {isMobile && (
        <Modal isOpen={sidebar} onBackdropClick={() => setSidebar((prev) => !prev)} isSidebar={true}>
          <aside className={cx("my-page-layout__sidebar--mobile")}>
            <Sidebar />
          </aside>
        </Modal>
      )}
    </div>
  );
};
export default MyPageLayout;
