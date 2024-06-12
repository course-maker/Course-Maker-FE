import React from "react";
import { useRecoilValue } from "recoil";
import { step1State, step2State, step3State } from "@/recoil/stepsAtom";
import { useStepper } from "../StepperContext";
import { postCourses } from "@/api/course/index";
import Button from "../../Button";
import { Tag, CourseDestination, Course } from "@/api/course/type";

interface NavigationButtonsProps {
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onClickNext, onClickPrev }) => {
  const step1 = useRecoilValue(step1State);
  const step2 = useRecoilValue(step2State);
  const step3 = useRecoilValue(step3State);
  const { goToNextStep, goToPrevStep, currentStep } = useStepper();

  const handleCourseSubmit = async () => {
    const tags: Tag[] = step1.tags.map((badge, index) => ({
      id: index + 1,
      name: badge,
      description: `${badge} description`,
    }));

    const courseDestinations: CourseDestination[] = [];
    Object.keys(step2.courseDestinations).forEach((day) => {
      step2.courseDestinations[parseInt(day)].forEach((destination, index) => {
        courseDestinations.push({
          visitOrder: index + 1,
          date: parseInt(day),
          destination: {
            ...destination,
            tags: destination.tags.map((tag: any, tagIndex: number) => ({
              id: tagIndex + 1,
              name: tag.name,
              description: tag.description,
            })),
          },
        });
      });
    });

    const postData: Course = {
      title: step3.title,
      content: step3.content,
      duration: step1.duration,
      travelerCount: step1.travelCount,
      travelType: 1,
      pictureLink: step3.pictureLink,
      courseDestinations,
      tags,
    };

    try {
      const response = await postCourses(postData);
      if (response) {
        alert("코스가 등록되었습니다.");
        // window.location.replace("/search");
      } else {
        alert(`Error: ${Error}`);
      }
    } catch (error) {
      console.error("Failed to submit course:", error);
      alert("코스 등록에 실패했습니다.");
    }
  };
  return (
    <div className="buttonContainer">
      {currentStep > 1 && (
        <Button color="navy" variant="secondary" size="medium" onClick={onClickPrev || goToPrevStep}>
          이전으로
        </Button>
      )}
      {currentStep < 3 && (
        <Button color="navy" size="medium" variant="primary" onClick={onClickNext || goToNextStep}>
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
