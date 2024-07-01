import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./TitleInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(({ ...props }, ref) => {
  return <input className={cx("input")} ref={ref} {...props} />;
});

export default TitleInput;
