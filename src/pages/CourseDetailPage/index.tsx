import CourseDetailInfo from "@/components/domains/DetailPage/CourseDetail/CourseDetailInfo/CourseDetailInfo";
import CourseHeader from "@/components/domains/DetailPage/CourseDetail/Header/CourseHeader";
import DetailPageLayout from "@/layout/DetailPageLayout";

const CourseDetailPage = () => {
  return <DetailPageLayout header={<CourseHeader />} main={<CourseDetailInfo />} />;
};

export default CourseDetailPage;
