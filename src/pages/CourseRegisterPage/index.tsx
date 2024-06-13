import React, { useEffect } from "react";
import { Step1, Step2, Step3, Stepper } from "@/components/commons/Steppers";
import { Step } from "@/components/commons/Steppers/Step";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";
import styles from "./CourseRegisterPage.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { removeFromLocalStorage } from "@/utils/localStorage";

const cx = classNames.bind(styles);

const CourseRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "설정하신 옵션들이 초기화 됩니다. 이동하시겠습니까?";
      event.returnValue = message;
      return message;
    };

    const handlePopState = () => {
      const confirmationMessage = "설정하신 옵션들이 초기화 됩니다. 이동하시겠습니까?";
      if (!window.confirm(confirmationMessage)) {
        navigate(1); // 뒤로가기를 취소하고 앞으로 이동
      } else {
        removeFromLocalStorage("step1");
        removeFromLocalStorage("step2");
        removeFromLocalStorage("step3");
        removeFromLocalStorage("combinedStepData");
      }
    };

    window.onbeforeunload = handleBeforeUnload;
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.onbeforeunload = null;
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
