import { getCourseDetail } from "@/api/course";
import { AllCardList } from "@/components/commons/CardList/CardList";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import styles from "./CourseDetailInfo.module.scss";
import classNames from "classnames/bind";
import Image from "../../../../commons/Image/index";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

const CourseDetailInfo = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: courseDetailData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  if (isSuccess) {
    courseDetailData;
  } else {
    if (isError) {
      isError;
    }
  }
  const ratingData = [
    { icon: IMAGES.BlackFavoriteIcon, value: "320" },
    { icon: IMAGES.BlackBookmarkIcon, value: "121" },
    { icon: IMAGES.BlackStarIcon, value: "4.2" },
  ];

  return (
    <div className={cx("course-detail-info")}>
      <div className={cx("course-detail-info__main-image-container")}>
        <img
          className={cx("course-detail-info__main-image")}
          src={courseDetailData?.pictureLink}
          alt="코스상세페이지 대표 이미지"
        />
      </div>
      <div className={cx("destination-section")}>
        <div className={cx("destination-section__header")}>
          <p className={cx("destination-section__title")}>전체 여행지</p>
          <p className={cx("destination-section__subtitle")}>
            여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.
          </p>
        </div>
        <AllCardList>
          {courseDetailData &&
            courseDetailData.courseDestinations.map((item, id) => (
              <Link to={`/destination/${item.destination.id}`} key={id}>
                <div className={cx("destination-card")}>
                  <div className={cx("destination-card__image-container")}>
                    <img
                      className={cx("destination-card__image")}
                      src={item?.destination?.pictureLink}
                      alt={`${item?.destination?.name} 이미지`}
                    />
                  </div>
                  <div className={cx("destination-card__info")}>
                    <div className={cx("destination-card__details")}>
                      <p className={cx("destination-card__name")}>{item?.destination?.name}</p>
                      <p className={cx("destination-card__address")}>{item?.destination?.location?.address}</p>
                    </div>
                    <div className={cx("destination-card__ratings")}>
                      {ratingData.map((item, index) => (
                        <span key={index} className={cx("destination-card__rating-item")}>
                          <Image imageInfo={item.icon} />
                          <span>{item.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </AllCardList>
      </div>
    </div>
  );
};

export default CourseDetailInfo;
