import CourseHeader from "@/components/domains/detail/course/CourseHeader/CourseHeader";
import CourseMain from "@/components/domains/detail/course/CourseMain/CourseMain";
import TravelCourseOnMap from "@/components/domains/detail/course/TravelCourseOnMap/TravelCourseOnMap";
import DetailPageLayout from "@/layout/DetailPageLayout";

const CourseDetailPage = () => {
  return (
    <DetailPageLayout type="course" header={<CourseHeader />} main={<CourseMain />} info={<TravelCourseOnMap />} />
  );
};

export default CourseDetailPage;
