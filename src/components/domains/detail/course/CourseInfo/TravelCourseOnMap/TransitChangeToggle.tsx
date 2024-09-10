import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./TransitChangeToggle.module.scss";

const cx = classNames.bind(styles);

interface TransitChangeToggleProps {
  selectedTransit: "car" | "bus";
  onClick: () => void;
}

const TransitChangeToggle = ({ selectedTransit, onClick }: TransitChangeToggleProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("btns")}>
        <div className={cx("btn", { isSelected: selectedTransit === "car" })} onClick={onClick}>
          <div className={cx("icon")}>
            {selectedTransit === "car" ? (
              <Image imageInfo={IMAGES.deepGrayCar} />
            ) : (
              <Image imageInfo={IMAGES.whiteCar} />
            )}
          </div>
          <span className={cx("text")}>자동차</span>
        </div>
        <div className={cx("btn", { isSelected: selectedTransit === "bus" })} onClick={onClick}>
          <div className={cx("icon")}>
            {selectedTransit === "bus" ? (
              <Image imageInfo={IMAGES.deepGrayBus} />
            ) : (
              <Image imageInfo={IMAGES.whiteBus} />
            )}
          </div>
          <span className={cx("text")}>대중교통</span>
        </div>
      </div>
    </div>
  );
};
export default TransitChangeToggle;
