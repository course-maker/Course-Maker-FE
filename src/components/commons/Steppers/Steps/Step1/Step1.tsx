import classNames from "classnames/bind";
import { ReactNode } from "react";
import styles from "./Step1.module.scss";

const cx = classNames.bind(styles);
export interface ChapterProps {
  children: ReactNode;
}
const Step1 = ({ children }: ChapterProps) => {
  return <div className={cx("step-box")}>{children}</div>;
};

export default Step1;
