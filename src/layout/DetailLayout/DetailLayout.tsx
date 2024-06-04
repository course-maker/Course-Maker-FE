import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./DetailLayout.module.scss";

const cx = classNames.bind(styles);

interface DetailLayoutProps {
  children: ReactNode;
}

const DetailLayout = ({ children }: DetailLayoutProps) => {
  return <section className={cx("section")}>{children}</section>;
};

export default DetailLayout;
