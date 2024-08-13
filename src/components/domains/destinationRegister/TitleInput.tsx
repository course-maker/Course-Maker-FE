import { forwardRef, InputHTMLAttributes } from "react";

import classNames from "classnames/bind";
import styles from "./TitleInput.module.scss";

const cx = classNames.bind(styles);

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(({ ...props }, ref) => {
  return <input className={cx("input")} ref={ref} maxLength={30} {...props} />;
});

export default TitleInput;
