import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./TransitTimeChip.module.scss";

const cx = classNames.bind(styles);

interface TransitTimeChipProps {
  transit: "private" | "public";
  time: string;
  onClick: () => void;
}

const TransitTimeChip = ({ transit, time, onClick }: TransitTimeChipProps) => {
  return (
    <div className={cx("container")} onClick={onClick}>
      <div className={cx("content")}>
        <div className={cx("icon", "transit")}>
          {transit === "private" ? <Image imageInfo={IMAGES.grayCar} /> : <Image imageInfo={IMAGES.grayBus} />}
        </div>
        <p className={cx("time")}>{time}</p>
        <div className={cx("icon", "triangle")}>
          <Image imageInfo={IMAGES.grayTransitTriangle} />
        </div>
      </div>
    </div>
  );
};
export default TransitTimeChip;
