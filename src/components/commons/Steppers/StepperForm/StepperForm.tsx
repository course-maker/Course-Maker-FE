import { postCourses } from "@/api/course/index";
import { step1State, step2State, step3State } from "@/recoil/stepsAtom";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import classNames from "classnames/bind";
import React, { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { StepperProvider } from "../StepperContext";
import styles from "./StepperForm.module.scss";

const cx = classNames.bind(styles);

interface StepperFormProps {
  children: ReactNode;
}
export interface Root {
  duration: number;
  travelCount: number;
  selectedBadges: string[];
  selectedDestinations: string[];
  title: string;
  content: string;
}

const StepperForm = ({ children }: StepperFormProps) => {
  const [step1, setStep1] = useRecoilState(step1State);
  const [step2, setStep2] = useRecoilState(step2State);
  const [step3, setStep3] = useRecoilState(step3State);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: Root = { ...step1, ...step2, ...step3 };
    console.log("Form Data:", formData);
    saveToLocalStorage("courseData", formData);
    postCourses(formData).then((response) => console.log(response));
  };

  useEffect(() => {
    const savedStep1 = getFromLocalStorage("step1");
    const savedStep2 = getFromLocalStorage("step2");
    const savedStep3 = getFromLocalStorage("step3");
    if (savedStep1) setStep1(savedStep1);
    if (savedStep2) setStep2(savedStep2);
    if (savedStep3) setStep3(savedStep3);
  }, [setStep1, setStep2, setStep3]);

  return (
    <StepperProvider>
      <form className={cx("courses-form")} onSubmit={onSubmit}>
        {children}
      </form>
    </StepperProvider>
  );
};

export default StepperForm;
