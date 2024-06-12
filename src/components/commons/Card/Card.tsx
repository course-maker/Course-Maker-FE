import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import ItemBox from "@/components/commons/ItemBox/ItemBox";
import { IMAGES } from "@/constants/images";
import Skeleton from "react-loading-skeleton";
const cx = classNames.bind(styles);

import { getDestinationResponseDto } from "@/api/destination/type";
import { Course } from "@/api/course/type";

//getDestinationResponseDto | Course 타입가드
const isCourse = (item: any): item is Course => {
  return (item as Course).courseDestinations !== undefined;
};

const isList = (item: any): item is getDestinationResponseDto => {
  return (item as getDestinationResponseDto).location !== undefined;
};

const Card = ({ item, name, loading }: { item: any; name: string; loading: boolean }) => {
  const navigate = useNavigate();
  console.log(item);
  console.log(name);
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
      onClick={() => navigate(`/${name === "코스 찾기" ? "course" : "destination"}/${item.id}`)}>
      <img
        alt={IMAGES.testImage.alt}
        src={(item as Course | getDestinationResponseDto).pictureLink}
        className={cx("card-image")}
      />
      <div className={cx("card-content")}>
        {isCourse(item) && name === "코스 찾기" && (
          <ItemBox
            location={item.courseDestinations[0].destination.location}
            title={item.title}
            tags={item.courseTags}
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
