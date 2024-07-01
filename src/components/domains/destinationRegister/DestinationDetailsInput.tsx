import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./DestinationDetailsInput.module.scss";
import classNames from "classnames/bind";

import Button from "@/components/commons/Button";

const cx = classNames.bind(styles);
interface DestinationDetailsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  buttonName: string;
  selectedOption: string;
  helperText?: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DestinationDetailsInput = forwardRef<HTMLInputElement, DestinationDetailsInputProps>(
  ({ title, buttonName, selectedOption, helperText, onButtonClick, ...props }, ref) => {
    return (
      <div className={cx("container")}>
        <div className={cx("input")}>
          <h2 className={cx("input-title")}>{title}</h2>
          <input
            className={cx("input-field", { isAddress: title === "여행지 위치" })}
            ref={ref}
            value={selectedOption}
            readOnly
            {...props}
          />
          <Button color="navy" variant="primary" size="small" onClick={onButtonClick}>
            {buttonName}
          </Button>
        </div>
        {helperText && <p className={cx("helper-text")}>{helperText}</p>}
      </div>
    );
  },
);

export default DestinationDetailsInput;
