import CourseDetailInfo from "@/components/domains/DetailPage/CourseDetail/CourseDetailInfo/CourseDetailInfo";
import CourseHeader from "@/components/domains/DetailPage/CourseDetail/Header/CourseHeader";
import DetailPageLayout from "@/layout/DetailPageLayout";
// import classNames from "classnames/bind";
// import styles from "./CourseDetailPage.module.scss";

// const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  return <DetailPageLayout header={<CourseHeader />} main={<CourseDetailInfo />} />;
};

export default CourseDetailPage;

{
  /* <main className={cx("container")}>
<Section className={cx("section")}>
  <CourseHeader />
</Section>
<Section className={cx("section")}>
  <CourseDetailInfo />
</Section>
<Section className={cx("section")}>Tabs</Section>
</main> */
}
