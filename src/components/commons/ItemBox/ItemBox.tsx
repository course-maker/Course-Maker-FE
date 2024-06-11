import classNames from "classnames/bind";
import styles from "./ItemBox.module.scss";
import Badge from "@/components/commons/Badge/Badge";

import { tagResponseDto } from "@/api/tag/type";
// import Image from "@/components/commons/Image";
// import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

// interface Icons {
//   [key: string]: number;
// }

// interface Tag {
//   id: number;
//   name: string;
//   description: string;
// }

interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

interface ItemBoxProps {
  location: Location;
  title?: string;
  tags: tagResponseDto[];
}

// const iconMapping: { [key: string]: any } = {
//   blackHeart: IMAGES.blackHeartIcon,
//   blackThumbsUp: IMAGES.blackThumbsUpIcon,
//   blackStar: IMAGES.blackStarIcon,
//   heart: IMAGES.heartIcon,
//   thumbsUp: IMAGES.thumbsUpIcon,
//   star: IMAGES.starIcon,
//   location: IMAGES.locationIcon,
//   linkCopy: IMAGES.linkCopyIcon,
//   calendar: IMAGES.calendarIcon,
//   member: IMAGES.memberIcon,
// };

const ItemBox = ({ location, title, tags }: ItemBoxProps) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>{title}</p>
        <p className={cx("item-location")}>{location.address}</p>
      </div>
      <div className={cx("score-group")}>
        {tags?.map((tag) => (
          <Badge key={tag.id} color="gray" variant="primary" size="xsmall">
            {tag.name}
          </Badge>
        ))}
        {/* 아이콘 고도화때 작업 예정 
        {Object.entries(tags).map(([key, value]) => (
          <span key={key} className={cx("score-item")}>
            <Image imageInfo={iconMapping[key]} />
            {value}
          </span>
        ))} */}
      </div>
    </div>
  );
};

export default ItemBox;
