import { ChapterProps } from "../Step1/Step1";
import styles from "./Step2.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Step2 = ({ children }: ChapterProps) => {
  return <div className={cx("step-box")}>{children}</div>;
};

export default Step2;
