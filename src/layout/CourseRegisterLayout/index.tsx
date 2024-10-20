import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./CourseRegisterLayout.module.scss";

import Button from "@/components/commons/Button";

import LabelWrapper from "@/components/commons/LabelWrapper";
import { API_INPUTS, INPUTS } from "@/constants/courseInputs";
import { useHandleImageUpload } from "@/hooks/useFormImageUpload";
import { validateFormData } from "@/utils/validateCourseFormData";

const cx = classNames.bind(styles);

interface CourseRegisterLayoutProps {
  isApiData?: boolean;
  formData: FieldValues;
  title: string;
  onSubmitClick: (data: FieldValues) => void;
}

const CourseRegisterLayout = ({ isApiData, formData, title, onSubmitClick }: CourseRegisterLayoutProps) => {
  const inputElement = isApiData ? API_INPUTS : INPUTS;
  const { handleImageUpload } = useHandleImageUpload();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    watch,
  } = useForm({
    defaultValues: formData,
    values: formData,
  });
  const duration = watch("duration");

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!validateFormData(data, setFocus)) return;

    if (data.pictureLink instanceof File) {
      data.pictureLink = await handleImageUpload(data.pictureLink);
    }
    onSubmitClick(data);
  };

  return (
    <>
      <div className={cx("container")}>
        <h1 className={cx("title")}>{title}</h1>
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(inputElement).map(
            ([key, { label, message, isEssential, component: InputComponent, ...rest }]) => (
              <LabelWrapper
                key={key}
                label={label}
                message={message}
                isEssential={isEssential}
                component={<InputComponent formFieldName={key} control={control} duration={duration} {...rest} />}
              />
            ),
          )}
          <div className={cx("form-btn")}>
            <Button color="blue" variant="secondary" size="large" type="submit" isDisabled={isSubmitting}>
              {title}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseRegisterLayout;
