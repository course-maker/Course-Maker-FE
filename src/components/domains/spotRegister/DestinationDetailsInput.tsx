import { forwardRef, InputHTMLAttributes } from "react";

import styles from "./DestinationDetailsInput.module.scss";
import classNames from "classnames/bind";

import Button from "@/components/commons/Button";

const cx = classNames.bind(styles);
interface DestinationDetailsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  buttonName: string;
  selectedOption: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DestinationDetailsInput = forwardRef<HTMLInputElement, DestinationDetailsInputProps>(
  ({ title, buttonName, selectedOption, onButtonClick, ...props }, ref) => {
    return (
      <div className={cx("container")}>
        <h2 className={cx("title")}>{title}</h2>
        <input
          className={cx("input", { isAddress: title === "여행지 위치" })}
          ref={ref}
          value={selectedOption}
          readOnly
          {...props}
        />
        <Button color="navy" variant="primary" size="small" onClick={onButtonClick}>
          {buttonName}
        </Button>
      </div>
    );
  },
);

export default DestinationDetailsInput;
