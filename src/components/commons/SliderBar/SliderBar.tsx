import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./SliderBar.module.scss";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";

const cx = classNames.bind(styles);

interface SliderBarProps {
  type: "TravelCount" | "Duration";
}
const Slider = ({ type }: SliderBarProps) => {
  const [value, setValue] = useState(type === "Duration" ? 2 : 5);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
  };

  const marks = type === "Duration" ? ["1일", "2일", "3일"] : ["1인", "2인", "3인", "4인", "5인 이상"];

  return (
    <div className={cx("slider-container")}>
      <div className={cx("slider-box")}>
        <div className={cx("slider-title")}>{type === "Duration" ? "여행기간" : "여행추천인원"}</div>
        <div className={cx("slider-marks")}>
          {marks.map((mark, index) => (
            <div key={index} className={cx("mark")}>
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
            max={type === "Duration" ? 3 : 5}
            value={value}
            onChange={handleSliderChange}
            className={cx("slider-input")}
          />
          <div className={cx("slider-thumb")} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
