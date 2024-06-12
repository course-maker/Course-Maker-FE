import { useStepper } from "../StepperContext";
import { FaCheck } from "react-icons/fa6";
import styles from "./Stepper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface StepperProps {
  children: React.ReactNode;
}

const Stepper = ({ children }: StepperProps) => {
  const { currentStep } = useStepper();

  return (
    <>
      <div className={cx("stepIndicator")}>
        <div>
          <FaCheck className={cx("check-icon")} />
          <div className={cx("stepCircle")}></div>
          <div className={cx("stepLabel")}>Step1</div>
        </div>
        <div>
          <FaCheck className={cx("check-icon")} />
          <div className={cx(currentStep >= 2 ? "stepCircle" : "inactiveCircle")}></div>
          <div className={cx(currentStep >= 2 ? "step-line" : "inactive-line")}></div>
          <div className={cx("stepLabel")}>Step2</div>
        </div>
        <div>
          <FaCheck className={cx("check-icon")} />
          <div className={cx(currentStep === 3 ? "stepCircle" : "inactiveCircle")}></div>
          <div className={cx(currentStep === 3 ? "step-line" : "inactive-line")}></div>
          <div className={cx("stepLabel")}>Step3</div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Stepper;
