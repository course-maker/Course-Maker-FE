import classNames from "classnames/bind";
import styles from "./ItemBox.module.scss";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface Icons {
  date: number;
  member: number;
  star: number;
}

interface ItemBoxProps {
  location: string;
  title?: string;
  icons: Icons;
}

const ItemBox = ({ location, title, icons }: ItemBoxProps) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>{title}</p>
        <p className={cx("item-location")}>{location}</p>
      </div>
      <div className={cx("score-group")}>
        <span className={cx("score-item")}>
          <Image imageInfo={IMAGES.blackHeartIcon} />
          {icons.date}
        </span>
        <span className={cx("score-item")}>
          <Image imageInfo={IMAGES.blackThumbsUpIcon} />
          {icons.member}
        </span>
        <span className={cx("score-item")}>
          <Image imageInfo={IMAGES.blackStarIcon} />
          {icons.star}
        </span>
      </div>
    </div>
  );
};

export default ItemBox;
