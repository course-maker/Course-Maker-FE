import { MouseEventHandler } from "react";
import styles from "./ModalContentBox.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface ModalContentBoxProps {
  message: string;
  hasCloseBtn: boolean;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
}

const ModalContentBox = ({ message, hasCloseBtn, onCloseClick, onConfirmClick }: ModalContentBoxProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("message-box")}>
        {hasCloseBtn && (
          <button className={cx("message-box-close")} onClick={onCloseClick}>
            <Image imageInfo={IMAGES.modalClose} />
          </button>
        )}
        <p className={cx("message-box-message")}>{message}</p>
      </div>
      <button className={cx("btn-box")} onClick={onConfirmClick}>
        확인
      </button>
    </div>
  );
};

export default ModalContentBox;
