import CourseHeader from "@/components/domains/detail/course/CourseHeader/CourseHeader";
import CourseInfo from "@/components/domains/detail/course/CourseInfo/CourseInfo";
import CourseMain from "@/components/domains/detail/course/CourseMain/CourseMain";
import DetailPageLayout from "@/layout/DetailPageLayout";

const CourseDetailPage = () => {
  return <DetailPageLayout type="course" header={<CourseHeader />} main={<CourseMain />} info={<CourseInfo />} />;
};

export default CourseDetailPage;
