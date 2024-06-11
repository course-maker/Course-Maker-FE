import { useRecoilState } from "recoil";
import { step1State } from "@/recoil/stepsAtom";
import Slider from "@/components/commons/SliderBar/SliderBar";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";
import data from "../../../../../pages/SearchPage/data.json";
import styles from "./Step1.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const courseData = data.courseData;

const Step1 = () => {
  const [step1, setStep1] = useRecoilState(step1State);

  const handleBadgeToggle = (badge: string) => {
    const badges = step1.selectedBadges.includes(badge)
      ? step1.selectedBadges.filter((b) => b !== badge)
      : [...step1.selectedBadges, badge];
    setStep1({ ...step1, selectedBadges: badges });
  };

  return (
    <div>
      <Slider type="Duration" />
      <Slider type="TravelCount" />
      <div className={cx("BadgeList-box")}>
        <p className={cx("BadgeList-title")}>태그 선택</p>
        {Object.entries(courseData).map(([title, badges]) => (
          <RegisterBadgeList
            key={title}
            title={title}
            badges={badges}
            selectedBadges={step1.selectedBadges}
            toggleBadge={handleBadgeToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Step1;
