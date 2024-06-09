import { useMemo } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import styles from "./SpotRegisterLayout.module.scss";
import classNames from "classnames/bind";
import TitleInputController from "@/components/domains/spotRegister/TitleInputController";
import Button from "@/components/commons/Button";
import BadgeListController from "@/components/domains/spotRegister/BadgeListsController";

const cx = classNames.bind(styles);

interface SpotRegisterLayoutProps {
  formData: any; // Dto로 대체하기
  title: string;
}

const SpotRegisterLayout = ({ formData, title }: SpotRegisterLayoutProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return formData;
    }, [formData]),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>{title}</h1>
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form-destination")}>
          <TitleInputController formFieldName="location" control={control} />
        </div>
        <div className={cx("form-indent")}>
          <div className={cx("form-tag")}>
            <h2 className={cx("form-tag-title")}>태그</h2>
            <div className={cx("form-tag-content")}>
              <BadgeListController formFieldName="tags" control={control} />
            </div>
          </div>
        </div>
        <Button color="navy" variant="primary" size="large" type="submit">
          {title}
        </Button>
      </form>
    </div>
  );
};

export default SpotRegisterLayout;
