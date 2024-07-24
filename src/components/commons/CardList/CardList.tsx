import { useEffect, useRef } from "react";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { CardContent } from "../CardContent/CardContent";

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

  return (
    <div className={cx("list-container")} ref={listContainerRef}>
      <div className={cx("list-box")}>
        {destinations.map((item, id) =>
          useLink ? (
            <Link to={`/destination/${item.destination.id}`} key={id}>
              <CardContent item={item} ratingValues={ratingValues} />
            </Link>
          ) : (
            <CardContent item={item} ratingValues={ratingValues} key={id} />
          ),
        )}
      </div>
    </div>
  );
};
