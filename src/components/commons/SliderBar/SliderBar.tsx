import React from "react";
import classNames from "classnames/bind";
import styles from "./SliderBar.module.scss";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";

const cx = classNames.bind(styles);

interface SliderBarProps {
  type: "TravelerCount" | "Duration";
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderBarProps> = ({ type, value, onChange }) => {
  const marks = type === "Duration" ? ["1일", "2일", "3일"] : ["1인", "2인", "3인", "4인", "5인 이상"];
  const maxValue = type === "Duration" ? 3 : 5;

  return (
    <div className={cx("slider-container")}>
      <div className={cx("slider-box")}>
        <div className={cx("slider-title")}>{type === "Duration" ? "여행기간" : "여행추천인원"}</div>
        <div className={type === "Duration" ? styles["slider-marks-duration"] : styles["slider-marks-traveler"]}>
          {marks.map((mark, index) => (
            <div key={index} className={type === "Duration" ? styles["marks-duration"] : styles["marks-traveler"]}>
              {mark}
              <div className={cx("range-line")}>
                <Image imageInfo={IMAGES.rangeLine} />
              </div>
            </div>
          ))}
        </div>
        <div className={cx("slider-track")}>
          <input
            type="range"
            min="1"
            max={maxValue}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            className={cx("slider-input")}
          />
          <div className={cx("slider-thumb")} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
