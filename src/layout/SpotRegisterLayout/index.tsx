// import { useMemo } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import styles from "./SpotRegisterLayout.module.scss";
import classNames from "classnames/bind";

import Button from "@/components/commons/Button";
import TitleInputController from "@/components/domains/spotRegister/TitleInputController";
import BadgeListController from "@/components/domains/spotRegister/BadgeListsController";
import AddressSearchController from "@/components/domains/spotRegister/AddressSearchInputController";
import MainImageInputController from "@/components/domains/spotRegister/MainImageInputController";
import QuillEditorController from "@/components/domains/spotRegister/QuillEditorController";

import { validateFormData } from "@/utils/validateFormData";

const cx = classNames.bind(styles);

interface SpotRegisterLayoutProps {
  formData: FieldValues;
  title: string;
  onSubmitClick: (data: FieldValues) => void;
}

const SpotRegisterLayout = ({ formData, title, onSubmitClick }: SpotRegisterLayoutProps) => {
  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: formData,
    values: formData,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!validateFormData(data, setFocus)) return;
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
        <QuillEditorController formFieldName="content" control={control} />
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
