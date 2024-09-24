import BadgeListsController from "@/components/commons/BadgeListsController";
import Slider from "@/components/commons/SliderBar/SliderBar";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";
import { useStepper } from "../../StepperContext";
import styles from "./Step1.module.scss";

const cx = classNames.bind(styles);

const Step1: React.FC = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { control, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      duration: 1,
      travelerCount: 1,
      tags: [],
    },
  });

  useEffect(() => {
    const savedStep1 = getFromLocalStorage("step1");
    if (savedStep1) {
      reset(savedStep1);
    }
  }, [reset]);

  const handleNext = (data: any) => {
    if (data.tags.length === 0) {
      alert("태그를 1개 이상 선택해주세요.");
      return;
    }
    saveToLocalStorage("step1", data);
    goToNextStep();
  };

  const handlePrev = () => {
    const savedStep1 = getFromLocalStorage("step1");
    if (savedStep1) {
      reset(savedStep1);
    }
    goToPrevStep();
  };

  const handleDurationChange = (value: number) => {
    setValue("duration", value);
  };

  const handleTravelCountChange = (value: number) => {
    setValue("travelerCount", value);
  };

  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <Slider type="Duration" value={watch("duration")} onChange={handleDurationChange} />
      <Slider type="TravelerCount" value={watch("travelerCount")} onChange={handleTravelCountChange} />
      <div className={cx("BadgeList-box")}>
        <p className={cx("BadgeList-title")}>태그 선택</p>
        <BadgeListsController formFieldName="tags" control={control} />
      </div>
      <NavigationButtons onClickNext={handleSubmit(handleNext)} onClickPrev={handlePrev} />
    </form>
  );
};

export default Step1;
