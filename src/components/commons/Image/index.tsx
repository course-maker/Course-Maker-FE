import styles from "./Image.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type ImageInfo = {
  src: string;
  alt: string;
};
type ObjectFit = "fill" | "contain" | "cover" | "scale-down" | "none";

interface ImageProps {
  imageInfo: ImageInfo;
  objectFit?: ObjectFit;
}

const Image = ({ imageInfo, objectFit = "fill" }: ImageProps) => {
  return <img className={cx("img")} src={imageInfo.src} alt={imageInfo.alt} style={{ objectFit: objectFit }} />;
};

export default Image;
