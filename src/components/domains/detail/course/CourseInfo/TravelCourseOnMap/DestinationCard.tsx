import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./DestinationCard.module.scss";

const cx = classNames.bind(styles);

interface DestinationCardProps {
  number: number;
  title: string;
  address: string;
  isSelected: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

const DestinationCard = ({ number, title, address, isSelected, onClick, onRemove }: DestinationCardProps) => {
  return (
    <div className={cx("container")} onClick={onClick}>
      <div className={cx("content")}>
        <div className={cx("icon")}>
          {isSelected ? <Image imageInfo={IMAGES.destinationPinStress} /> : <Image imageInfo={IMAGES.destinationPin} />}
          <span className={cx("icon-num")}>{number}</span>
        </div>
        <div className={cx("text")}>
          <h3 className={cx("text-title")}>{title}</h3>
          <p className={cx("text-address")}>{address}</p>
        </div>
        <div className={cx("btn")} onClick={onRemove}>
          <button className={cx("remove-btn")}>
            <Image imageInfo={IMAGES.cancel} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DestinationCard;
