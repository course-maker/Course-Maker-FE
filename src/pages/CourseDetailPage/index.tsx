import Section from "@/components/commons/Section/Section";
import classNames from "classnames/bind";
import styles from "./CourseDetailPage.module.scss";
import CourseHeader from "../../components/domains/DetailPage/CourseDetail/Header/CourseHeader";
import CourseDetailInfo from "../../components/domains/DetailPage/CourseDetail/CourseDetailInfo/CourseDetailInfo";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  return (
    <main className={cx("container")}>
      <Section>
        <CourseHeader />
      </Section>
      <Section>
        <CourseDetailInfo />
      </Section>
      <Section>Tabs</Section>
    </main>
  );
};

export default CourseDetailPage;
