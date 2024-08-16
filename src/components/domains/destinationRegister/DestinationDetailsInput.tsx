import { forwardRef, InputHTMLAttributes } from "react";

import classNames from "classnames/bind";
import styles from "./DestinationDetailsInput.module.scss";

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
      <div className={cx("input")}>
        <input
          className={cx("input-field", { isAddress: title === "여행지 위치" })}
          ref={ref}
          value={selectedOption}
          readOnly
          {...props}
        />
        <Button color="blue" variant="secondary" size="small" onClick={onButtonClick} isSquare={true}>
          {buttonName}
        </Button>
      </div>
    );
  },
);

export default DestinationDetailsInput;
