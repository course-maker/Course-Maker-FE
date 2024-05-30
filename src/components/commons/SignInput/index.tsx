import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./SignInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // fix: type 지정하고 바꾸기
  isError?: boolean;
  isVerified?: boolean;
  helperText?: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, label, type = "text", isError = false, isVerified = false, helperText, ...props }, ref) => {
    return (
      <div className={cx("container")}>
        <div className={cx("input")}>
          {label && (
            <label className={cx("input-label")} htmlFor={id}>
              {label}
            </label>
          )}
          <input className={cx("input-field", { isLabelExist: !!label })} ref={ref} id={id} type={type} {...props} />
        </div>
        <p className={cx("helper-text", { error: isError, verified: isVerified })}>{helperText}</p>
      </div>
    );
  },
);

export default SignInput;
