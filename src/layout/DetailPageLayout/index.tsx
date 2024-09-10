import InfoAndReviewTab from "@/components/domains/detail/InfoAndReviewTab";
import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./DetailPageLayout.module.scss";

const cx = classNames.bind(styles);

interface DetailPageLayoutProps {
  type: "course" | "destination";
  header: ReactNode;
  main: ReactNode;
  info: ReactNode;
  // review: ReactNode;
}

const DetailPageLayout = ({ type, header, main, info }: DetailPageLayoutProps) => {
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>{header}</header>
      <main className={cx("main")}>{main}</main>
      <article className={cx("article")}>
        <InfoAndReviewTab type={type} info={info} />
      </article>
    </div>
  );
};
export default DetailPageLayout;
