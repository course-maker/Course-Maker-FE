import React from "react";
import { useRecoilState } from "recoil";
import { step1State } from "@/recoil/stepsAtom";
import Slider from "@/components/commons/SliderBar/SliderBar";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";
import data from "../../../../../pages/SearchPage/data.json";
import styles from "./Step1.module.scss";
import classNames from "classnames/bind";
import { useStepper } from "../../StepperContext";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";

const cx = classNames.bind(styles);

const courseData = data.courseData;

const Step1: React.FC = () => {
  const [step1, setStep1] = useRecoilState(step1State);
  const { goToNextStep } = useStepper();

  const handleBadgeToggle = (badge: string) => {
    const badges = step1.tags.includes(badge) ? step1.tags.filter((b) => b !== badge) : [...step1.tags, badge];
    setStep1({ ...step1, tags: badges });
  };

  const handleNext = () => {
    if (step1.tags.length === 0) {
      alert("태그를 1개 이상 선택해주세요.");
      return;
    }
    goToNextStep();
  };

  return (
    <>
      <Slider type="Duration" />
      <Slider type="TravelCount" />
      <div className={cx("BadgeList-box")}>
        <p className={cx("BadgeList-title")}>태그 선택</p>
        {Object.entries(courseData).map(([title, badges]) => (
          <RegisterBadgeList
            key={title}
            title={title}
            badges={badges}
            selectedBadges={step1.tags}
            toggleBadge={handleBadgeToggle}
          />
        ))}
      </div>
      <NavigationButtons onClickNext={handleNext} />
    </>
  );
};

export default Step1;
