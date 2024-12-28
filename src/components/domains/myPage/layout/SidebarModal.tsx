import Modal from "@/components/commons/Modal";
import { sidebarState } from "@/recoil/sidebarAtom";
import { useRecoilState } from "recoil";
import { useWindowSize } from "usehooks-ts";
import Sidebar from "./Sidebar";

import classNames from "classnames/bind";
import styles from "./SidebarModal.module.scss";

const cx = classNames.bind(styles);

const SidebarModal = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 1200;

  if (!isMobile) return null;

  return (
    <Modal isOpen={sidebar} onBackdropClick={() => setSidebar((prev) => !prev)} isSidebar={true}>
      <aside className={cx("sidebar-modal")}>
        <Sidebar />
      </aside>
    </Modal>
  );
};
export default SidebarModal;
