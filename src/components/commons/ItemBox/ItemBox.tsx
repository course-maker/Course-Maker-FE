import classNames from "classnames/bind";
import styles from "./ItemBox.module.scss";
import Badge from "@/components/commons/Badge/Badge";

import { tagResponseDto } from "@/api/tag/type";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";
const cx = classNames.bind(styles);

interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

interface ItemBoxProps {
  location: Location;
  title?: string;
  tags?: tagResponseDto[];
  travelerCount?: number;
  views?: number;
  duration?: number;
  name?: string;
  color?: string;
}

const ItemBox: React.FC<ItemBoxProps> = ({ location, title, tags, name, travelerCount, views, duration, color }) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>{title}</p>
        {name === "코스 찾기" ? (
          <p className={cx("item-location")}>조회수 {views} 회</p>
        ) : (
          <p className={cx("item-location")}>{location.address}</p>
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
              <span className={cx("score-text")}>{travelerCount}점</span>
            </div>
          </div>
        ) : (
          <div className={cx("score-group")}>
            {tags?.slice(0, 3).map((tag) => (
              <Badge key={tag.id} color="gray" variant="primary" size="xsmall">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
