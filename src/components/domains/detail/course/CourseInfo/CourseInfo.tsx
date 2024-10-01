import { getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { authState } from "@/recoil/authAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Description from "../../Description/Description";
import styles from "./CourseInfo.module.scss";
import TravelCourseOnMap from "./TravelCourseOnMap";
import TravelDurationAndGroup from "./TravelDurationAndGroup/TravelDurationAndGroup";

const cx = classNames.bind(styles);

const CourseInfo = () => {
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
    <div className={cx("container")}>
      <div className={cx("info")}>
        <TravelDurationAndGroup travelerCount={courseDetail.travelerCount} duration={courseDetail.duration} />
      </div>
      <div className={cx("course")}>
        <TravelCourseOnMap courseDetail={courseDetail} />
      </div>
      <div className={cx("description")}>
        <Description content={courseDetail.content} />
      </div>
    </div>
  );
};
export default CourseInfo;
