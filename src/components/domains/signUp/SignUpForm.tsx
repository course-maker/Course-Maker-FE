import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { SIGN_UP_CONDITION } from "@/constants/signInputCondition";
import SignInputController from "@/components/commons/SignInputController";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const { control, handleSubmit } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = () => {
    // console.log(data);
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("form-input-field")}>
        {(Object.keys(SIGN_UP_CONDITION) as Array<keyof typeof SIGN_UP_CONDITION>).map((key) => (
          <SignInputController key={key} name={key} control={control} condition={SIGN_UP_CONDITION[key]} />
        ))}
      </div>
      <Button type="submit" color="navy" variant="primary" size="large">
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;
