import React from "react";
import { useStepper } from "../StepperContext";
import Button from "../../Button";
import styles from "./NavigationButtons.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
interface NavigationButtonsProps {
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onClickNext, onClickPrev }) => {
  const { goToNextStep, goToPrevStep, currentStep } = useStepper();

  return (
    <div className={cx("buttonContainer")}>
      {currentStep > 1 && (
        <Button color="navy" variant="secondary" size="medium" onClick={onClickPrev || goToPrevStep}>
          이전으로
        </Button>
      )}
      {currentStep < 3 && (
        <Button color="navy" size="medium" variant="primary" onClick={onClickNext || goToNextStep}>
          다음으로
        </Button>
      )}
      {currentStep === 3 && (
        <Button type="submit" color="navy" variant="primary" size="medium">
          코스 등록하기
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
