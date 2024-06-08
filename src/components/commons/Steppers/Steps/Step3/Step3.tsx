import { ChapterProps } from "../Step1/Step1";
import styles from "./Step3.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Step3 = ({ children }: ChapterProps) => {
  return <div className={cx("step-box")}>{children}</div>;
};

export default Step3;
