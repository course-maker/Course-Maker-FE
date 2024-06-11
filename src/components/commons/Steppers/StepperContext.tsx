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
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPrevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <StepperContext.Provider value={{ currentStep, goToNextStep, goToPrevStep }}>{children}</StepperContext.Provider>
  );
};
