import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./TravelDurationAndGroup.module.scss";

const cx = classNames.bind(styles);

interface TravelDurationAndGroupProps {
  travelerCount: number;
  duration: number;
}

const TravelDurationAndGroup = ({ travelerCount, duration }: TravelDurationAndGroupProps) => {
  return (
    <ul className={cx("container")}>
      <li className={cx("element")}>
        <div className={cx("icon")}>
          <Image imageInfo={IMAGES.courseInfoPeople} />
        </div>
        <div className={cx("text")}>
          <h4>여행추천인원</h4>
          <p className={cx("text-stress")}>{travelerCount}인</p>
        </div>
      </li>
      <li className={cx("element")}>
        <div className={cx("icon")}>
          <Image imageInfo={IMAGES.courseInfoCanlendar} />
        </div>
        <div className={cx("text")}>
          <h4>여행기간</h4>
          <p className={cx("text-stress")}>{duration}일</p>
        </div>
      </li>
    </ul>
  );
};
export default TravelDurationAndGroup;
