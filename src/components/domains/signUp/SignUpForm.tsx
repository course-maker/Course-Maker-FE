import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { SIGN_UP_CONDITION, SIGN_UP_EMAIL_CONDITION } from "@/constants/signInputCondition";
import SignInputController from "@/components/commons/SignInputController";
import EmailInputController from "./EmailInputController";
import { useRef } from "react";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const { control, handleSubmit, setValue } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      phoneNumber: "",
    },
  });

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async () => {
    // 여기에서 유효성 검사에 통과한 데이터를 서버로 전송
    // console.log(data);
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <div className={cx("form-input")}>
        <EmailInputController
          name="email"
          control={control}
          condition={SIGN_UP_EMAIL_CONDITION.email}
          setValue={setValue}
        />
        <div className={cx("form-input-except-email")}>
          {(Object.keys(SIGN_UP_CONDITION) as Array<keyof typeof SIGN_UP_CONDITION>).map((key) => (
            <SignInputController key={key} name={key} control={control} condition={SIGN_UP_CONDITION[key]} />
          ))}
        </div>
      </div>
      <Button type="submit" color="navy" variant="primary" size="large" ref={submitButtonRef}>
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;
