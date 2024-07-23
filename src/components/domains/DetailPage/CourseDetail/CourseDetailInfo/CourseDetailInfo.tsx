import { getCourseDetail } from "@/api/course";
import { AllCardList } from "@/components/commons/CardList/CardList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styles from "./CourseDetailInfo.module.scss";
import classNames from "classnames/bind";

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
        <AllCardList
          useLink={true}
          destinations={courseDetailData?.courseDestinations || []}
          ratingValues={{
            likes: "320",
            bookmarks: "121",
            rating: "4.2",
          }}
        />
      </div>
    </div>
  );
};

export default CourseDetailInfo;
