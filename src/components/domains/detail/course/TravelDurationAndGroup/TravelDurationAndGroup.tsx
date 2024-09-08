import { getCourseDetail } from "@/api/course";
import Image from "@/components/commons/Image";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { IMAGES } from "@/constants/images";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import styles from "./TravelDurationAndGroup.module.scss";

const cx = classNames.bind(styles);

const TravelDurationAndGroup = () => {
  const { id } = useParams<{ id: string }>();

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

  return (
    <ul className={cx("container")}>
      <li className={cx("element")}>
        <div className={cx("icon")}>
          <Image imageInfo={IMAGES.courseInfoPeople} />
        </div>
        <div className={cx("text")}>
          <h4>여행추천인원</h4>
          <p className={cx("text-stress")}>{courseDetail.travelerCount}인</p>
        </div>
      </li>
      <li className={cx("element")}>
        <div className={cx("icon")}>
          <Image imageInfo={IMAGES.courseInfoCanlendar} />
        </div>
        <div className={cx("text")}>
          <h4>여행기간</h4>
          <p className={cx("text-stress")}>{courseDetail.duration}일</p>
        </div>
      </li>
    </ul>
  );
};
export default TravelDurationAndGroup;
