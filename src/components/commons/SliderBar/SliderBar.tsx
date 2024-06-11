import classNames from "classnames/bind";
import styles from "./SliderBar.module.scss";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";
import { useRecoilState } from "recoil";
import { step1State } from "@/recoil/stepsAtom";

const cx = classNames.bind(styles);

interface SliderBarProps {
  type: "TravelCount" | "Duration";
}
const Slider = ({ type }: SliderBarProps) => {
  const [step1, setStep1] = useRecoilState(step1State);

  const handleSliderChange = (name: string, value: number) => {
    setStep1({ ...step1, [name]: value });
    console.log(step1.duration);
  };

  const marks = type === "Duration" ? ["1일", "2일", "3일"] : ["1인", "2인", "3인", "4인", "5인 이상"];
  const maxValue = type === "Duration" ? 3 : 5;
  const currentValue = type === "Duration" ? step1.duration : step1.travelCount;

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
            max={maxValue}
            value={currentValue}
            onChange={(event) =>
              handleSliderChange(type === "Duration" ? "duration" : "travelCount", Number(event.target.value))
            }
            className={cx("slider-input")}
          />
          <div className={cx("slider-thumb")} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
