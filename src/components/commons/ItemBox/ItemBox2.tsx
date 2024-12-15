import classNames from "classnames/bind";
import styles from "./ItemBox2.module.scss";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";

const cx = classNames.bind(styles);

interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

interface ItemBoxProps {
  title?: string;
  location?: Location;
  travelerCount?: number;
  views?: string;
  duration?: number;
  name?: string;
  color?: string;
  averageRating?: number;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  location,
  title,
  averageRating,
  name,
  travelerCount,
  views,
  duration,
  color,
}) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>
          {title && title.replace(/\?/g, "").length > 18
            ? `${title.replace(/\?/g, "").slice(0, 18)}...`
            : title?.replace(/\?/g, "")}
        </p>
        {name === "코스 찾기" ? (
          <p className={cx("item-location")}>조회수 {views} 회</p>
        ) : (
          <p className={cx("item-location")}>
            {location?.address && location?.address?.length > 18
              ? `${location?.address.slice(0, 18)}...`
              : location?.address}
          </p>
        )}
      </div>
      <div>
        {name === "코스 찾기" ? (
          <div className={cx("score-group")}>
            <div className={cx("score-item-course")}>
              <Image imageInfo={color === "white" ? IMAGES.calendarWhiteIcon : IMAGES.calendarIcon} />
              <span className={cx("score-text")}>{duration}일</span>
            </div>
            <div className={cx("score-item-course")}>
              <Image imageInfo={color === "white" ? IMAGES.memberWhiteIcon : IMAGES.memberIcon} />
              <span className={cx("score-text")}>{travelerCount}인</span>
            </div>
            <div className={cx("score-item-course")}>
              <Image imageInfo={color === "white" ? IMAGES.WhiteStarIcon : IMAGES.BlackStarIcon} />
              <span className={cx("score-text")}>{averageRating}점</span>
            </div>
          </div>
        ) : (
          <div className={cx("score-group-destination")}>
            <p className={cx("item-location")}>조회수 {views} 회</p>
            <div className={cx("score-item-destination")}>
              <Image imageInfo={color === "white" ? IMAGES.WhiteStarIcon : IMAGES.BlackStarIcon} />
              <span className={cx("score-text")}>{averageRating}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
