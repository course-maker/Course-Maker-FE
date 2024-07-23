import Section from "@/components/commons/Section/Section";
import classNames from "classnames/bind";
import styles from "./CourseDetailPage.module.scss";
import CourseHeader from "../../components/domains/DetailPage/CourseDetail/Header/CourseHeader";
import CourseDetailInfo from "../../components/domains/DetailPage/CourseDetail/CourseDetailInfo/CourseDetailInfo";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  return (
    <main className={cx("container")}>
      <Section className={cx("section")}>
        <CourseHeader />
      </Section>
      <Section className={cx("section")}>
        <CourseDetailInfo />
      </Section>
      <Section className={cx("section")}>Tabs</Section>
    </main>
  );
};

export default CourseDetailPage;
