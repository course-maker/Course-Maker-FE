import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./DestinationRegisterLayout.module.scss";

import Button from "@/components/commons/Button";

import LabelWrapper from "@/components/commons/LabelWrapper";
import { API_INPUTS, INPUTS } from "@/constants/destinationRegisterAndEditPageInputs";
import { useHandleImageUpload } from "@/hooks/useFormImageUpload";
import { validateFormData } from "@/utils/validateFormData";

const cx = classNames.bind(styles);

interface DestinationRegisterLayoutProps {
  isApiData?: boolean;
  formData: FieldValues;
  title: string;
  onSubmitClick: (data: FieldValues) => void;
}

const DestinationRegisterLayout = ({ isApiData, formData, title, onSubmitClick }: DestinationRegisterLayoutProps) => {
  const inputElement = isApiData ? API_INPUTS : INPUTS;
  const { handleImageUpload } = useHandleImageUpload();
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
      data.pictureLink = await handleImageUpload(data.pictureLink);
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

export default DestinationRegisterLayout;
