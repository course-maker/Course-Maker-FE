import React from "react";
import { Step1, Step2, Step3, Stepper } from "@/components/commons/Steppers";
import { Step } from "@/components/commons/Steppers/Step";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";
import styles from "./CourseRegisterPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const CourseRegisterPage: React.FC = () => {
  return (
    <StepperProvider>
      <section className={cx("section")}>
        <Stepper>
          <Step stepNumber={1}>
            <Step1 />
          </Step>
          <Step stepNumber={2}>
            <Step2 />
          </Step>
          <Step stepNumber={3}>
            <Step3 />
          </Step>
        </Stepper>
      </section>
    </StepperProvider>
  );
};

export default CourseRegisterPage;
