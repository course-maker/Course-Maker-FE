import React from "react";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";
import { Step1, Step2, Step3, Stepper } from "@/components/commons/Steppers";
import StepperForm from "@/components/commons/Steppers/StepperForm/StepperForm";
import { Step } from "@/components/commons/Steppers/Step";

const CourseRegisterPage: React.FC = () => {
  return (
    <StepperProvider>
      <section className="section">
        <StepperForm>
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
        </StepperForm>
      </section>
    </StepperProvider>
  );
};

export default CourseRegisterPage;
