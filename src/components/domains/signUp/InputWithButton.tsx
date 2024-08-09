import Button from "@/components/commons/Button";
import SignInput from "@/components/commons/SignInput";
import { SignField } from "@/constants/signInputCondition";
import classNames from "classnames/bind";
import styles from "./InputWithButton.module.scss";

const cx = classNames.bind(styles);

interface InputWithButtonProps {
  type: string;
  condition: SignField;
}

const InputWithButton = ({ type, condition }: InputWithButtonProps) => {
  return (
    <div className={cx("container")}>
      <SignInput {...condition} />
      <Button color="blue" variant={type === "email" ? "primary" : "secondary"} size="medium">
        {condition.button}
      </Button>
    </div>
  );
};
export default InputWithButton;
