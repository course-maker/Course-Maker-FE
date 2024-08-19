import { forwardRef, InputHTMLAttributes } from "react";

import classNames from "classnames/bind";
import styles from "./DestinationDetailsInput.module.scss";

import Button from "@/components/commons/Button";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { useWindowSize } from "usehooks-ts";

const cx = classNames.bind(styles);
interface DestinationDetailsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  buttonName: string;
  selectedOption: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const DestinationDetailsInput = forwardRef<HTMLInputElement, DestinationDetailsInputProps>(
  ({ title, buttonName, selectedOption, onButtonClick, ...props }, ref) => {
    const { width } = useWindowSize();
    const isMobileSize = width < 744;

    return (
      <div className={cx("input")} onClick={isMobileSize ? onButtonClick : undefined}>
        <input
          className={cx("input-field", { isAddress: title === "여행지 위치" })}
          ref={ref}
          value={selectedOption}
          readOnly
          {...props}
        />
        {isMobileSize ? (
          title === "여행지 위치" ? (
            <button type="button" className={cx("input-mobile-btn")}>
              <Image imageInfo={IMAGES.GraySearchIcon} />
            </button>
          ) : (
            <button type="button" className={cx("input-mobile-btn")}>
              <Image imageInfo={IMAGES.GrayPhotoIcon} />
            </button>
          )
        ) : (
          <Button color="blue" variant="secondary" size="small" onClick={onButtonClick} isSquare={true}>
            {buttonName}
          </Button>
        )}
      </div>
    );
  },
);

export default DestinationDetailsInput;
