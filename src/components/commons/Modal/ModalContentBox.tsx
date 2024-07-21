import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { Fragment, MouseEventHandler } from "react";
import Image from "../Image";
import styles from "./ModalContentBox.module.scss";

const cx = classNames.bind(styles);

interface ModalContentBoxProps {
  content: string;
  hasCloseBtn: boolean;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
}

const ModalContentBox = ({ content, hasCloseBtn, onCloseClick, onConfirmClick }: ModalContentBoxProps) => {
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ));
  };

  return (
    <div className={cx("container")}>
      {hasCloseBtn && (
        <button className={cx("close-btn")} onClick={onCloseClick}>
          <Image imageInfo={IMAGES.modalClose} />
        </button>
      )}
      <p className={cx("content")}>{renderContent(content)}</p>
      <button className={cx("confirm-btn")} onClick={onConfirmClick}>
        확인
      </button>
    </div>
  );
};

export default ModalContentBox;
