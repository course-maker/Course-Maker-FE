import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./DestinationRegisterLayout.module.scss";

import BadgeListController from "@/components/commons/BadgeListsController";
import Button from "@/components/commons/Button";
import MainImageInputController from "@/components/commons/MainImageInputController/MainImageInputController";
import QuillEditorController from "@/components/commons/QuillEditorController";
import AddressSearchController from "@/components/domains/destinationRegister/AddressSearchInputController";
import TitleInputController from "@/components/domains/destinationRegister/TitleInputController";

import { useImageUpload } from "@/hooks/useImageUpload";
import { validateFormData } from "@/utils/validateFormData";

const cx = classNames.bind(styles);

interface SpotRegisterLayoutProps {
  formData: FieldValues;
  title: string;
  onSubmitClick: (data: FieldValues) => void;
}

const SpotRegisterLayout = ({ formData, title, onSubmitClick }: SpotRegisterLayoutProps) => {
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
        <TitleInputController formFieldName="name" control={control} />
        <div className={cx("form-indent")}>
          <div className={cx("form-tag")}>
            <h2 className={cx("form-tag-title")}>태그</h2>
            <div className={cx("form-tag-content")}>
              <BadgeListController formFieldName="tags" control={control} />
            </div>
          </div>
          <AddressSearchController formFieldName="location" control={control} />
          <MainImageInputController formFieldName="pictureLink" control={control} />
        </div>
        <QuillEditorController formFieldName="content" control={control} placeholder="여행지를 소개해주세요!" />
        <div className={cx("form-btn")}>
          <Button color="navy" variant="primary" size="large" type="submit">
            {title}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpotRegisterLayout;
