import { forwardRef, InputHTMLAttributes } from "react";

import classNames from "classnames/bind";
import styles from "./SignInput.module.scss";

const cx = classNames.bind(styles);

interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  isVerified?: boolean;
  helperText?: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, type = "text", isError = false, isVerified = false, helperText, ...props }, ref) => {
    return (
      <div className={cx("container")}>
        <input className={cx("input-field", { error: isError })} ref={ref} id={id} type={type} {...props} />
        <p className={cx("helper-text", { error: isError, verified: isVerified })}>{helperText}</p>
      </div>
    );
  },
);

export default SignInput;
