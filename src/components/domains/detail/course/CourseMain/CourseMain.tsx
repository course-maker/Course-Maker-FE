import { getCourseDetail } from "@/api/course";
import { AllCardList } from "@/components/commons/CardList/AllCardList";
import Image from "@/components/commons/Image";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { authState } from "@/recoil/authAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./CourseMain.module.scss";

const cx = classNames.bind(styles);

const CourseMain = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth] = useRecoilState(authState);

  const fetchCourseDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getCourseDetail(Number(id), options);
  };

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: fetchCourseDetail,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

  return (
    <div className={cx("course-detail-info")}>
      <div className={cx("course-detail-info__main-image-container")}>
        <Image
          imageInfo={{ src: courseDetail?.pictureLink, alt: `${courseDetail.title} 대표 이미지` }}
          objectFit="cover"
        />
      </div>
      <div className={cx("destination-section")}>
        <div className={cx("destination-section__header")}>
          <p className={cx("destination-section__title")}>전체 여행지</p>
          <p className={cx("destination-section__subtitle")}>
            여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.
          </p>
        </div>
        <div className={cx("destination-section__cards")}>
          <AllCardList useLink={true} destinations={courseDetail.courseDestinations} />
        </div>
      </div>
    </div>
  );
};

export default CourseMain;
