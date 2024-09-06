import { CourseDestination } from "@/api/course/type";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import React from "react";
import styles from "./CardContent.module.scss";

const cx = classNames.bind(styles);

interface CardContentProps {
  item: CourseDestination;
}

export const CardContent: React.FC<CardContentProps> = ({ item }) => {
  const ratingData = [
    { icon: IMAGES.BlackFavoriteIcon, value: item.destination.likeCount },
    { icon: IMAGES.BlackBookmarkIcon, value: item.destination.wishCount },
    { icon: IMAGES.BlackStarIcon, value: item.destination.averageRating },
  ];

  return (
    <div className={cx("destination-card")}>
      <div className={cx("destination-card__image-container")}>
        <img
          className={cx("destination-card__image")}
          src={item.destination.pictureLink}
          alt={`${item.destination.name} 이미지`}
        />
      </div>
      <div className={cx("destination-card__info")}>
        <div className={cx("destination-card__details")}>
          <p className={cx("destination-card__name")}>{item.destination.name}</p>
          <p className={cx("destination-card__address")}>{item.destination.location.address}</p>
        </div>
        <div className={cx("destination-card__ratings")}>
          {ratingData.map((ratingItem, index) => (
            <span key={index} className={cx("destination-card__rating-item")}>
              <Image imageInfo={ratingItem.icon} />
              <span>{ratingItem.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
