import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./DestinationRegisterLayout.module.scss";

import Button from "@/components/commons/Button";

import LabelWrapper from "@/components/commons/LabelWrapper";
import { API_INPUTS, INPUTS } from "@/constants/destinationRegisterAndEditPageInputs";
import { useImageUpload } from "@/hooks/useImageUpload";
import { validateFormData } from "@/utils/validateFormData";

const cx = classNames.bind(styles);

interface SpotRegisterLayoutProps {
  isApiData?: boolean;
  formData: FieldValues;
  title: string;
  onSubmitClick: (data: FieldValues) => void;
}

const SpotRegisterLayout = ({ isApiData, formData, title, onSubmitClick }: SpotRegisterLayoutProps) => {
  const inputElement = isApiData ? INPUTS : API_INPUTS;
  const { uploadImageAsync } = useImageUpload();
  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: formData,
    values: formData,
  });

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
      const formData = new FormData();
      formData.append("images", data.pictureLink);
      const imageUrlArray = await uploadImageAsync(formData);
      data.pictureLink = imageUrlArray[0];
    }
    onSubmitClick(data);
  };

  return (
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
              component={<InputComponent formFieldName={key} control={control} {...rest} />}
            />
          ),
        )}
        <div className={cx("form-btn")}>
          <Button color="blue" variant="secondary" size="large" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpotRegisterLayout;
