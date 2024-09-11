import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./TransitTimeChip.module.scss";

const cx = classNames.bind(styles);

interface TransitTimeChipProps {
  onClick: () => void;
}

const TransitTimeChip = ({ onClick }: TransitTimeChipProps) => {
  return (
    <div className={cx("container")} onClick={onClick}>
      <div className={cx("content")}>
        <div className={cx("icon", "transit")}>
          <Image imageInfo={IMAGES.graySign} />
        </div>
        <p className={cx("time")}>{"길찾기"}</p>
        <div className={cx("icon", "triangle")}>
          <Image imageInfo={IMAGES.grayTransitTriangle} />
        </div>
      </div>
    </div>
  );
};
export default TransitTimeChip;
