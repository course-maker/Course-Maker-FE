import Image from "@/components/commons/Image";
import Modal from "@/components/commons/Modal";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { KeyboardEventHandler } from "react";
import styles from "./ImageModal.module.scss";

const cx = classNames.bind(styles);

interface ImageModalProps {
  isOpen: boolean;
  onCloseClick: () => void;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  image: string;
}

const ImageModal = ({ isOpen, onCloseClick, onKeyDown, image }: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown}>
      <div className={cx("container")}>
        <button className={cx("close-btn")} onClick={onCloseClick}>
          <Image imageInfo={IMAGES.modalClose} />
        </button>
        <div className={cx("content-box")}>
          <img src={image} alt={"리뷰 이미지"} />
        </div>
      </div>
    </Modal>
  );
};
export default ImageModal;
