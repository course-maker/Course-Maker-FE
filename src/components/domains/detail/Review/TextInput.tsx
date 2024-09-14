import { ReviewFormType } from "@/type/type";
import classNames from "classnames/bind";
import { Control, Controller } from "react-hook-form";
import styles from "./TextInput.module.scss";

const cx = classNames.bind(styles);

interface TextInputProps {
  control: Control<ReviewFormType>;
}

const TextInput = ({ control }: TextInputProps) => {
  return (
    <Controller
      name="content"
      control={control}
      rules={{ required: "댓글을 작성해주세요." }}
      render={({ field, fieldState }) => (
        <div className={cx("content")}>
          <textarea className={cx("text-input")} placeholder="댓글을 작성해주세요." maxLength={4000} {...field} />
          <div className={cx("helper-text")}>
            <p className={cx("error")}>{fieldState.error?.message}</p>
            <p className={cx("length")}>{field.value.length} / 4000</p>
          </div>
        </div>
      )}
    />
  );
};
export default TextInput;
