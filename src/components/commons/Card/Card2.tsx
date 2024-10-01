import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import ItemBox2 from "@/components/commons/ItemBox/ItemBox2";

import { getDestinationResponseDto } from "@/api/destination/type";
import { formatNumberWithCommas } from "@/utils/formatters";
import { IMAGES } from "@/constants/images";
import { Course } from "@/api/course/type";

import classNames from "classnames/bind";
import styles from "./Card2.module.scss";
const cx = classNames.bind(styles);

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
  children?: any;
  isCourseTab?: boolean;
}

const Card2: React.FC<CardProps> = ({ item, name, loading, isCourseTab, children }) => {
  const navigate = useNavigate();

  if (loading) {
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
      onClick={() => navigate(`/${isCourseTab ? "course" : "destination"}/${item.id}`)}>
      {children}
      <div className={cx("card-image-container")}>
        <img
          loading="lazy"
          alt={IMAGES.testImage.alt}
          src={(item as Course | getDestinationResponseDto)?.pictureLink}
          className={cx("card-image")}
        />
      </div>
      <div className={cx("card-content")}>
        {isCourseTab
          ? isCourse(item) && (
              <ItemBox2
                name={name}
                title={item.title}
                travelerCount={item.travelerCount}
                views={formatNumberWithCommas(item.views)}
                duration={item.duration}
              />
            )
          : isList(item) && (
              <ItemBox2
                location={item.location}
                title={item.name}
                views={formatNumberWithCommas(item.views)}
                averageRating={item.averageRating}
              />
            )}
      </div>
    </div>
  );
};

export default Card2;
