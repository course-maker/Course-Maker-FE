import classNames from "classnames/bind";
import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./SignInput.module.scss";

const cx = classNames.bind(styles);

interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  isVerified?: boolean;
  helperText?: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, type = "text", isError = false, isVerified = false, helperText, ...props }, ref) => {
    const helperTextLines = helperText?.split("\n") || [];

    return (
      <div className={cx("container")}>
        <input className={cx("input-field", { error: isError })} ref={ref} id={id} type={type} {...props} />
        <div className={cx("helper-text")}>
          {helperTextLines.map((line, index) => (
            <p key={index} className={cx({ error: isError, verified: isVerified })}>
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

export default SignInput;
