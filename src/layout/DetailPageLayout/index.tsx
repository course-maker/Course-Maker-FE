import InfoAndReviewTab from "@/components/domains/DetailPage/InfoAndReviewTab";
import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./DetailPageLayout.module.scss";

const cx = classNames.bind(styles);

interface DetailPageLayoutProps {
  type: "course" | "destination";
  header: ReactNode;
  main: ReactNode;
  // info: ReactNode;
  // review: ReactNode;
}

const DetailPageLayout = ({ type, header, main }: DetailPageLayoutProps) => {
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>{header}</header>
      <main className={cx("main")}>{main}</main>
      <InfoAndReviewTab type={type} />
    </div>
  );
};
export default DetailPageLayout;
