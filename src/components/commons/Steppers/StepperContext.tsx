import { createContext, useContext, useState, ReactNode } from "react";

interface StepperContextProps {
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("StepperProvider error");
  }
  return context;
};

interface StepperProviderProps {
  children: ReactNode;
}

export const StepperProvider = ({ children }: StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };
  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <StepperContext.Provider value={{ currentStep, goToNextStep, goToPrevStep }}>{children}</StepperContext.Provider>
  );
};
