import { createCourse } from "@/api/course";
import { CourseDestination, DestinationDto, postCourse, Tag } from "@/api/course/register";
import MainImageInputController from "@/components/commons/MainImageInputController/MainImageInputController";
import QuillEditorController from "@/components/commons/QuillEditorController";
import { useImageUpload } from "@/hooks/useImageUpload";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";
import styles from "./Step3.module.scss";

const cx = classNames.bind(styles);

interface Step3FormValues {
  title: string;
  content: string;
  pictureFile: string;
  pictureLink: string;
}

interface Step2Data {
  courseDestinations: Record<number, DestinationDto[]>;
  tags: Tag[];
}

const Step3: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [step1Data, setStep1Data] = useState<postCourse | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const { register, handleSubmit, setValue, control } = useForm<Step3FormValues>({
    defaultValues: {
      title: "",
      content: "",
      pictureFile: "",
      pictureLink: "",
    },
  });

  const { uploadImageAsync } = useImageUpload();

  useEffect(() => {
    const savedStep1 = getFromLocalStorage("step1");
    const savedStep2 = getFromLocalStorage("step2");
    const savedStep3 = getFromLocalStorage("step3");
    if (savedStep1) {
      setStep1Data(savedStep1);
    }
    if (savedStep2) {
      setStep2Data(savedStep2);
    }
    if (savedStep3) {
      setValue("title", savedStep3.title);
      setValue("content", savedStep3.content);
      setValue("pictureLink", savedStep3.pictureLink);
    }
  }, [setValue]);

  const getDestinationsForActiveDay = (): DestinationDto[] => {
    if (!step2Data || !step2Data.courseDestinations) {
      return [];
    }

    return step2Data.courseDestinations[activeDay] || [];
  };

  const cleanContent = (content: string) => {
    return content.replace(/<p><br><\/p>/g, "").trim();
  };

  const onSubmit: SubmitHandler<Step3FormValues> = async (data) => {
    if (!data.title) {
      alert("코스 제목을 입력해주세요.");
      return;
    }

    if (!data.pictureFile) {
      alert("대표 이미지를 첨부해주세요.");
      return;
    }

    let pictureLink = "";
    try {
      const formData = new FormData();
      formData.append("images", data.pictureFile);
      const uploadResponse = await uploadImageAsync(formData);
      pictureLink = uploadResponse[0];
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }

    const cleanedContent = cleanContent(data.content);
    if (!cleanedContent) {
      alert("코스를 소개해주세요.");
      return;
    }

    const step3Data: Partial<postCourse> = {
      title: data.title,
      content: cleanedContent,
      pictureLink,
    };

    saveToLocalStorage("step3", step3Data);

    const step1 = getFromLocalStorage("step1") as postCourse | null;
    const step2 = getFromLocalStorage("step2") as Step2Data | null;

    if (!step1 || !step2) {
      alert("모든 스텝을 완료해주세요.");
      return;
    }

    const combinedStepData = {
      ...step1,
      ...step2,
      ...step3Data,
      travelType: 0,
    };

    saveToLocalStorage("combinedStepData", combinedStepData);

    const tags: Tag[] = combinedStepData.tags.map((tag: Tag, index: number) => ({
      id: index + 1,
      name: tag.name,
      description: `${tag.description}`,
    }));

    const courseDestinations: CourseDestination[] = Object.keys(combinedStepData.courseDestinations).flatMap((key) =>
      (combinedStepData.courseDestinations[parseInt(key)] as DestinationDto[]).map((destination, index) => ({
        visitOrder: index + 1,
        date: parseInt(key),
        destination: {
          id: destination.id,
          nickname: destination.nickname,
          name: destination.name,
          tags: destination.tags.map((tag: Tag, tagIndex: number) => ({
            id: tagIndex + 1,
            name: tag.name,
            description: tag.description,
          })),
          location: {
            address: destination.location.address,
            longitude: destination.location.longitude,
            latitude: destination.location.latitude,
          },
          pictureLink: destination.pictureLink,
          content: destination.content,
        } as DestinationDto,
      })),
    );

    const formData: postCourse = {
      title: combinedStepData.title!,
      content: combinedStepData.content!,
      duration: combinedStepData.duration,
      travelerCount: combinedStepData.travelerCount,
      travelType: combinedStepData.travelType,
      pictureLink: combinedStepData.pictureLink!,
      courseDestinations,
      tags,
    };

    try {
      await createCourse(formData);
      alert("코스가 등록되었습니다.");
      removeFromLocalStorage("step1");
      removeFromLocalStorage("step2");
      removeFromLocalStorage("step3");
      removeFromLocalStorage("combinedStepData");
      window.location.href = "/search";
    } catch (error) {
      console.error("Error posting course:", error);
      alert("코스 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("course-input-group")} encType="multipart/form-data">
        {step1Data && (
          <div className={cx("schedule-container")}>
            <div className={cx("schedule-item-group")}>
              <div className={cx("schedule-item-tags")}>
                <p className={cx("schedule-item-title")}>선택한 태그</p>
                <div className={cx("tag-box")}>
                  {step1Data.tags.map((tag: Tag, id: number) => (
                    <span key={id} className={cx("tag-item")}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cx("schedule-item-option")}>
                <div className={cx("schedule-item-box")}>
                  <p className={cx("schedule-item-title")}>여행기간</p>
                  <p className={cx("schedule-item-text")}>{step1Data.duration}일</p>
                </div>
                <div className={cx("schedule-item-box")}>
                  <p className={cx("schedule-item-title")}>여행추천인원</p>
                  <p className={cx("schedule-item-text")}>{step1Data.travelerCount}명</p>
                </div>
              </div>
            </div>
            <div className={cx("schedule-group")}>
              <div className={cx("day-btn-group")}>
                {[...Array(step1Data.duration)].map((_, index) => (
                  <button
                    type="button"
                    className={cx("day-btn", { active: activeDay === index + 1 })}
                    onClick={() => setActiveDay(index + 1)}
                    key={index}>
                    DAY{index + 1}
                  </button>
                ))}
              </div>
              <div className={cx("scrollable-list2")}>
                {getDestinationsForActiveDay().map((item, id) => (
                  <div className={cx("item-container")} key={id}>
                    <div className={cx("number-circle")}>{id + 1}</div>
                    <div>
                      <img className={cx("item-image")} src={item.pictureLink} alt={`${item.name} 이미지`} />
                    </div>
                    <div className={cx("item-box")}>
                      <div className={cx("title-group")}>
                        <p className={cx("item-title")}>{item.name}</p>
                        <p className={cx("item-location")}>{item.location.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="코스 이름을 입력하세요."
          className={cx("course-title-input")}
          {...register("title", { required: true })}
        />
        <div className={cx("image-upload")}>
          <MainImageInputController formFieldName="pictureFile" control={control} />
        </div>
        <div className={cx("quill-box")}>
          <QuillEditorController formFieldName="content" control={control} placeholder="코스를 소개해주세요!" />
        </div>
        <NavigationButtons />
      </form>
    </>
  );
};

export default Step3;
