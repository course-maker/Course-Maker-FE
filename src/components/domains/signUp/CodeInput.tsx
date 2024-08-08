import Button from "@/components/commons/Button";
import SignInput from "@/components/commons/SignInput";
import { SignField } from "@/constants/signInputCondition";
import classNames from "classnames/bind";
import styles from "./CodeInput.module.scss";

const cx = classNames.bind(styles);

interface CodiInputProps {
  condition: SignField;
}

const CodeInput = ({ condition }: CodiInputProps) => {
  return (
    <div className={cx("container")}>
      <SignInput {...condition} />
      <Button color="blue" variant="secondary" size="medium">
        인증확인
      </Button>
    </div>
  );
};
export default CodeInput;
