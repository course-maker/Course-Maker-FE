import { getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import styles from "./CourseInfo.module.scss";
import TravelCourseOnMap from "./TravelCourseOnMap";
import TravelDurationAndGroup from "./TravelDurationAndGroup/TravelDurationAndGroup";

const cx = classNames.bind(styles);

const CourseInfo = () => {
  const { id } = useParams<{ id: string }>();

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

  return (
    <div className={cx("container")}>
      <div className={cx("info")}>
        <TravelDurationAndGroup travelerCount={courseDetail.travelerCount} duration={courseDetail.duration} />
      </div>
      <div className={cx("course")}>
        <TravelCourseOnMap courseDetail={courseDetail} />
      </div>
    </div>
  );
};
export default CourseInfo;
