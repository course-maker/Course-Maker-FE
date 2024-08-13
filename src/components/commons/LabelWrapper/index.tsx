import classNames from "classnames/bind";
import { ReactElement } from "react";
import styles from "./LabelWrapper.module.scss";

const cx = classNames.bind(styles);

interface LabelWrapper {
  label: string;
  message: string;
  isEssential?: boolean;
  component: ReactElement;
}

const LabelWrapper = ({ label, message, isEssential, component: InputComponent }: LabelWrapper) => {
  return (
    <div className={cx("container")}>
      <h2 className={cx("label")}>
        {label}
        {isEssential && <span className={cx("asterisk")}> *</span>}
      </h2>
      <p className={cx("message")}>{message}</p>
      <div className={cx("component")}>{InputComponent}</div>
    </div>
  );
};
export default LabelWrapper;
