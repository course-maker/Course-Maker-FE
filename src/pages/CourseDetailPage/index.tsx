import CourseHeader from "@/components/domains/detail/course/CourseHeader/CourseHeader";
import CourseInfo from "@/components/domains/detail/course/CourseInfo/CourseInfo";
import CourseMain from "@/components/domains/detail/course/CourseMain/CourseMain";
import CourseReview from "@/components/domains/detail/course/CourseReview/CourseReview";
import DetailPageLayout from "@/layout/DetailPageLayout";

const CourseDetailPage = () => {
  return (
    <DetailPageLayout
      type="course"
      header={<CourseHeader />}
      main={<CourseMain />}
      info={<CourseInfo />}
      review={<CourseReview />}
    />
  );
};

export default CourseDetailPage;
