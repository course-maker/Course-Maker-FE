import Button from "@/components/commons/Button";
import SignInput from "@/components/commons/SignInput";
import { SignField } from "@/constants/signInputCondition";
import classNames from "classnames/bind";
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import styles from "./InputWithButton.module.scss";

const cx = classNames.bind(styles);

interface InputWithButtonProps<T extends FieldValues> {
  type: string;
  condition: SignField;
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
}

const InputWithButton = <T extends FieldValues>({ type, condition, field, fieldState }: InputWithButtonProps<T>) => {
  return (
    <div className={cx("container")}>
      <SignInput isError={fieldState.invalid} helperText={fieldState.error?.message} {...condition} {...field} />
      <Button color="blue" variant={type === "email" ? "primary" : "secondary"} size="medium">
        {condition.button}
      </Button>
    </div>
  );
};
export default InputWithButton;
