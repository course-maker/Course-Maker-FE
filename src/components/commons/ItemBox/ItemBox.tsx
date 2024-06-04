import classNames from "classnames/bind";
import styles from "./ItemBox.module.scss";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface Icons {
  [key: string]: number;
}

interface ItemBoxProps {
  location: string;
  title?: string;
  icons: Icons;
}

const iconMapping: { [key: string]: any } = {
  blackHeart: IMAGES.blackHeartIcon,
  thumbsUp: IMAGES.blackThumbsUpIcon,
  blackStar: IMAGES.blackStarIcon,
  blackStar: IMAGES.blackStarIcon,
  heart: IMAGES.heartIcon,
  thumbsUp: IMAGES.thumbsUpIcon,
  star: IMAGES.starIcon,
  location: IMAGES.locationIcon,
  linkCopy: IMAGES.linkCopyIcon,
};

const ItemBox = ({ location, title, icons }: ItemBoxProps) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>{title}</p>
        <p className={cx("item-location")}>{location}</p>
      </div>
      <div className={cx("score-group")}>
        {Object.entries(icons).map(([key, value]) => (
          <span key={key} className={cx("score-item")}>
            <Image imageInfo={iconMapping[key]} />
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ItemBox;
