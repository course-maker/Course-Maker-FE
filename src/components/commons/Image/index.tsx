import { ImageInfo } from "@/type/type";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

type ObjectFit = "fill" | "contain" | "cover" | "scale-down" | "none";

interface ImageProps {
  imageInfo: ImageInfo;
  objectFit?: ObjectFit;
  className?: string;
}

const Image = ({ imageInfo, objectFit = "fill", className }: ImageProps) => {
  return <img className={cx("img", objectFit, className)} src={imageInfo.src} alt={imageInfo.alt} />;
};

export default Image;
