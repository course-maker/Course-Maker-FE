import React from "react";
import { useRecoilState } from "recoil";
import { step1State, step2State, step3State } from "@/recoil/stepsAtom";
import { useStepper } from "../StepperContext";
import { postCourses } from "@/api/course/index";
import Button from "../../Button";

const NavigationButtons: React.FC = () => {
  const [step1] = useRecoilState(step1State);
  const [step2] = useRecoilState(step2State);
  const [step3] = useRecoilState(step3State);

  const { goToNextStep, goToPrevStep, currentStep } = useStepper();

  const handleCourseSubmit = () => {
    const formData = { ...step1, ...step2, ...step3 };
    alert("코스가 등록되었습니다.");
    postCourses(formData).then((response) => console.log(response));
  };

  return (
    <div className="buttonContainer">
      {currentStep > 1 && (
        <Button color="navy" variant="secondary" size="medium" onClick={goToPrevStep}>
          이전으로
        </Button>
      )}
      {currentStep < 3 && (
        <Button color="navy" size="medium" variant="primary" onClick={goToNextStep}>
          다음으로
        </Button>
      )}
      {currentStep === 3 && (
        <Button type="submit" color="navy" variant="primary" size="medium" onClick={handleCourseSubmit}>
          코스 등록하기
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
