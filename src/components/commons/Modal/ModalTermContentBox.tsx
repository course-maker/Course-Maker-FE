import { IMAGES } from "@/constants/images";
import { Term } from "@/constants/terms";
import classNames from "classnames/bind";
import { MouseEventHandler } from "react";
import ReactMarkdown from "react-markdown";
import Image from "../Image";
import styles from "./ModalTermContentBox.module.scss";

const cx = classNames.bind(styles);

interface ModalTermContentBoxProps {
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
  content: Term;
}

export const ModalTermContentBox = ({ onCloseClick, content }: ModalTermContentBoxProps) => {
  return (
    <div className={cx("container")}>
      <button className={cx("close-btn")} onClick={onCloseClick}>
        <Image imageInfo={IMAGES.modalClose} />
      </button>
      <div className={cx("content-box")}>
        <h1 className={cx("content-box-title")}>{content.title}</h1>
        <div className={cx("content-box-content")}>
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
