import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./SignInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  isVerified?: boolean;
  helperText?: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ value, placeholder, type = "text", isError = false, isVerified = false, helperText, ...props }, ref) => {
    return (
      <div className={cx("container")}>
        <input className={cx("input")} ref={ref} type={type} value={value} placeholder={placeholder} {...props} />
        <p className={cx("helper-text", { error: isError }, { verified: isVerified })}>{helperText}</p>
      </div>
    );
  },
);

export default SignInput;
