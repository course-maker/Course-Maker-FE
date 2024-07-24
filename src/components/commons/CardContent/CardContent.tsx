import React from "react";
import classNames from "classnames/bind";
import styles from "./CardContent.module.scss";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface DestinationItem {
  destination: {
    id: number;
    name: string;
    pictureLink: string;
    location: {
      address: string;
    };
  };
}

interface RatingValues {
  likes: string;
  bookmarks: string;
  rating: string;
}

interface CardContentProps {
  item: DestinationItem;
  ratingValues: RatingValues;
}

export const CardContent: React.FC<CardContentProps> = ({ item, ratingValues }) => {
  const ratingData = [
    { icon: IMAGES.BlackFavoriteIcon, value: ratingValues.likes },
    { icon: IMAGES.BlackBookmarkIcon, value: ratingValues.bookmarks },
    { icon: IMAGES.BlackStarIcon, value: ratingValues.rating },
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
