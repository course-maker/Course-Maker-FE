import ItemBox from "@/components/commons/ItemBox/ItemBox";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss";
const cx = classNames.bind(styles);

import { Course } from "@/api/course/type";
import { getDestinationResponseDto } from "@/api/destination/type";

const isCourse = (item: any): item is Course => {
  return (item as Course)?.courseDestinations !== undefined;
};

const isList = (item: any): item is getDestinationResponseDto => {
  return (item as getDestinationResponseDto)?.location !== undefined;
};

interface CardProps {
  item: any;
  name: string;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ item, name, loading }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  if (isLoading) {
    return (
      <div className={cx("card-container")}>
        <Skeleton height={200} width={300} className={cx("card-image")} />
        <div className={cx("card-content")}>
          <Skeleton count={3} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx("card-container")}
      onClick={() => navigate(`/${name === "코스 찾기" ? "course" : "destination"}/${item.id}`)}>
      <div className={cx("card-image-container")}>
        <img
          loading="lazy"
          alt={IMAGES.testImage.alt}
          src={(item as Course | getDestinationResponseDto)?.pictureLink}
          className={cx("card-image")}
        />
      </div>
      <div className={cx("card-content")}>
        {isCourse(item) && name === "코스 찾기" && (
          <ItemBox
            name={name}
            location={item.courseDestinations[0].destination.location}
            title={item.title}
            tags={item.courseTags || []}
            travelerCount={item.travelerCount}
            views={item.views}
            duration={item.duration}
          />
        )}
        {isList(item) && name === "여행지 찾기" && (
          <ItemBox location={item.location} title={item.name} tags={item.tags} />
        )}
      </div>
    </div>
  );
};

export default Card;
