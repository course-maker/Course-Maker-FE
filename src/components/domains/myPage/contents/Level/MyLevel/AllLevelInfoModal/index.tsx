import Image from "@/components/commons/Image";
import Modal from "@/components/commons/Modal";
import { IMAGES } from "@/constants/images";
import { USER_LEVEL_INFO_LIST } from "@/constants/userlevelInfoList";
import LevelInfoBox from "./LevelInfoBox";

import classNames from "classnames/bind";
import styles from "./AllLevelInfoModal.module.scss";

const cx = classNames.bind(styles);

interface AllLevelInfoModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

const AllLevelInfoModal = ({ isModalOpen, onModalClose }: AllLevelInfoModalProps) => {
  return (
    <Modal isOpen={isModalOpen} onBackdropClick={onModalClose}>
      <div className={cx("all-level-info-modal")}>
        <button className={cx("all-level-info-modal__close-btn")} onClick={onModalClose}>
          <Image imageInfo={IMAGES.modalClose} />
        </button>
        <div className={cx("all-level-info-modal__header")}>
          <div className={cx("all-level-info-modal__header-logo")}>
            <Image imageInfo={IMAGES.courseMakerLogo} />
            <h1 className={cx("all-level-info-modal__header-title")}>등급 안내</h1>
          </div>
        </div>
        <ul className={cx("all-level-info-modal__level-info-list")}>
          {USER_LEVEL_INFO_LIST.map((info) => (
            <li key={info.id} className={cx("all-level-info-modal__level-info-list-element")}>
              <LevelInfoBox info={info} />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};
export default AllLevelInfoModal;
