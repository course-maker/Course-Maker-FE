import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./DetailPageLayout.module.scss";

const cx = classNames.bind(styles);

interface DetailPageLayoutProps {
  header: ReactNode;
  main: ReactNode;
  // info: ReactNode;
}

const DetailPageLayout = ({ header, main }: DetailPageLayoutProps) => {
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>{header}</header>
      <main className={cx("main")}>{main}</main>
    </div>
  );
};
export default DetailPageLayout;
