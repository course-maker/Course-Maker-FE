import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { MouseEventHandler } from "react";
import Image from "../Image";
import styles from "./ModalTermContentBox.module.scss";

const cx = classNames.bind(styles);

interface ModalTermContentBoxProps {
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ModalTermContentBox = ({ onCloseClick }: ModalTermContentBoxProps) => {
  return (
    <div className={cx("container")}>
      <button className={cx("close-btn")} onClick={onCloseClick}>
        <Image imageInfo={IMAGES.modalClose} />
      </button>
      <div className={cx("content-box")}></div>
    </div>
  );
};
