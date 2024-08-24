import Button from "@/components/commons/Button";
import SignInput from "@/components/commons/SignInput";
import { SignField } from "@/constants/signInputCondition";
import { Status } from "@/type/type";
import classNames from "classnames/bind";
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import styles from "./InputWithButton.module.scss";

const cx = classNames.bind(styles);

interface InputWithButtonProps<T extends FieldValues> {
  type: string;
  condition: SignField;
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  status: Status;
  onClick: () => void;
}

const InputWithButton = <T extends FieldValues>({
  type,
  condition,
  field,
  fieldState,
  status,
  onClick,
}: InputWithButtonProps<T>) => {
  const isButtonBlock = () => {
    if (type === "email") {
      return (
        !fieldState.isDirty ||
        (fieldState.invalid && fieldState.error?.type !== "expired") ||
        status.status === "pending"
      );
    } else if (type === "code") {
      return status.status !== "timer";
    }
    return false;
  };

  const helperText = () => {
    if (type === "code" && fieldState.error?.type === "mismatch") {
      return `${fieldState.error?.message}\n${status.message}`;
    }
    return status.message || fieldState.error?.message || condition.defaultMessage;
  };

  return (
    <div className={cx("container")}>
      <SignInput
        id={type}
        isError={fieldState.invalid}
        isVerified={status.status === "success" || status.status === "timer"}
        helperText={helperText()}
        disabled={type === "code" && status.status !== "timer"}
        {...condition}
        {...field}
      />
      <Button
        color="blue"
        variant={type === "email" ? "primary" : "secondary"}
        size="medium"
        isSquare={true}
        onClick={onClick}
        disabled={isButtonBlock()}>
        {status.status === "pending" ? "전송중" : condition.button}
      </Button>
    </div>
  );
};
export default InputWithButton;
