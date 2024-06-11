import React from "react";
import { useStepper } from "./StepperContext";

interface StepProps {
  stepNumber: number;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ stepNumber, children }) => {
  const { currentStep } = useStepper();

  return currentStep === stepNumber ? <div>{children}</div> : null;
};

interface StepperProps {
  children: React.ReactNode;
}

export const Stepper: React.FC<StepperProps> = ({ children }) => {
  return <div>{children}</div>;
};
