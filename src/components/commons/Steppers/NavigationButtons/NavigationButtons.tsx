import { useStepper } from "../StepperContext";
import styles from "./NavigationButtons.module.scss";
import classNames from "classnames/bind";
import Button from "../../Button";

const cx = classNames.bind(styles);

const NavigationButtons = () => {
  const { goToNextStep, goToPrevStep, currentStep } = useStepper();

  const handleCourseSubmit = () => {
    alert("코스가 등록되었습니다.");
  };
  return (
    <div className={cx("buttonContainer")}>
      {currentStep > 1 && (
        <Button color="navy" variant="secondary" size="medium" onClick={goToPrevStep}>
          이전으로
        </Button>
      )}
      {currentStep < 3 && (
        <Button color="navy" size="medium" variant="primary" onClick={goToNextStep}>
          다음으로
        </Button>
      )}
      {currentStep === 3 && (
        <Button type="submit" color="navy" variant="primary" size="medium" onClick={handleCourseSubmit}>
          코스 등록하기
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
