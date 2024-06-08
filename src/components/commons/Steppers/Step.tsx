import { ReactNode } from "react";
import { useStepper } from "./StepperContext";

interface StepProps {
  stepNumber: number;
  children: ReactNode;
}

const Step = ({ stepNumber, children }: StepProps) => {
  const { currentStep } = useStepper();

  return currentStep === stepNumber ? <div>{children}</div> : null;
};

export default Step;
