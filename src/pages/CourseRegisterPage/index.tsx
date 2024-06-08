import styles from "./CourseRegisterPage.module.scss";
import classNames from "classnames/bind";
import { Step1, Step2, Step3, Step, Stepper } from "@/components/commons/Steppers";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";
import Slider from "@/components/commons/SliderBar/SliderBar";
import data from "../SearchPage/data.json";
import { useState } from "react";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";

const cx = classNames.bind(styles);
const courseData = data.courseData;

const CourseRegisterPage = () => {
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prevSelected) =>
      prevSelected.includes(badge) ? prevSelected.filter((item) => item !== badge) : [...prevSelected, badge],
    );
  };

  return (
    <StepperProvider>
      <section className={cx("section")}>
        <form className={cx("stepper-container")}>
          <Stepper>
            <Step stepNumber={1}>
              <Step1>
                <Slider type="Duration" />
                <Slider type="TravelCount" />
                <p className={cx("BadgeList-title")}>태그선택</p>
                <div className={cx("BadgeList-box")}>
                  {Object.entries(courseData).map(([title, badges]) => (
                    <RegisterBadgeList
                      key={title}
                      title={title}
                      badges={badges}
                      selectedBadges={selectedBadges}
                      toggleBadge={toggleBadge}
                    />
                  ))}
                </div>
              </Step1>
            </Step>
            <Step stepNumber={2}>
              <Step2>
                <div>챕터2</div>
              </Step2>
            </Step>
            <Step stepNumber={3}>
              <Step3>
                <div>챕터3</div>
              </Step3>
            </Step>
          </Stepper>
        </form>
      </section>
    </StepperProvider>
  );
};

export default CourseRegisterPage;
