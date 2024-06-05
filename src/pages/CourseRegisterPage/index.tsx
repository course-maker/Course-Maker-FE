import styles from "./CourseRegisterPage.module.scss";
import classNames from "classnames/bind";
import { Step1, Step2, Step3, Step, Stepper } from "@/components/commons/Steppers";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";

const cx = classNames.bind(styles);

const CourseRegisterPage = () => {
  return (
    <StepperProvider>
      <section className={cx("section")}>
        <form className={cx("stepper-container")}>
          <Stepper>
            <Step stepNumber={1}>
              <Step1>
                <div>챕터1</div>
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
