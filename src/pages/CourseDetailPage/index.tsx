import CourseHeader from "@/components/domains/detail/course/CourseHeader/CourseHeader";
import CourseMain from "@/components/domains/detail/course/CourseMain/CourseMain";
import DetailPageLayout from "@/layout/DetailPageLayout";

const CourseDetailPage = () => {
  return <DetailPageLayout type="course" header={<CourseHeader />} main={<CourseMain />} />;
};

export default CourseDetailPage;
