import { useEffect, useRef } from "react";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
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

interface AllCardListProps {
  destinations: DestinationItem[];
  ratingValues: RatingValues;
  useLink?: boolean;
}

export const AllCardList = ({ destinations, ratingValues, useLink = false }: AllCardListProps) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, []);

  const ratingData = [
    { icon: IMAGES.BlackFavoriteIcon, value: ratingValues.likes },
    { icon: IMAGES.BlackBookmarkIcon, value: ratingValues.bookmarks },
    { icon: IMAGES.BlackStarIcon, value: ratingValues.rating },
  ];

  const CardContent = ({ item }: { item: DestinationItem }) => (
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

  return (
    <div className={cx("list-container")} ref={listContainerRef}>
      <div className={cx("list-box")}>
        {destinations.map((item, id) =>
          useLink ? (
            <Link to={`/destination/${item.destination.id}`} key={id}>
              <CardContent item={item} />
            </Link>
          ) : (
            <CardContent item={item} key={id} />
          ),
        )}
      </div>
    </div>
  );
};
