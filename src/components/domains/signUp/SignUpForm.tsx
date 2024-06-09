import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { SIGN_UP_CONDITION, SIGN_UP_EMAIL_CONDITION } from "@/constants/signInputCondition";
import SignInputController from "@/components/commons/SignInputController";
import EmailInputController from "./EmailInputController";
import { useRef, useState, useEffect } from "react";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";
import { validateNickname } from "@/utils/validateSignUpElements";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const { postSignUp } = useSignUpMutation();

  const { control, handleSubmit, setError, watch } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      phoneNumber: "",
    },
  });

  const nickname = watch("nickname");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  const onSubmit = (data: SignUpFormInputs) => {
    if (isEmailValid && isNicknameValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...restData } = data;
      postSignUp(restData);
    } else {
      if (!isEmailValid) {
        setError("email", {
          type: "invalid",
          message: "이메일 중복 확인을 해주세요.",
        });
      }
      if (nickname && !isNicknameValid) {
        setError("nickname", {
          type: "invalid",
          message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.",
        });
      }
    }
  };

  useEffect(() => {
    const validate = async () => {
      if (nickname) {
        const isDuplicate = await validateNickname(nickname);
        if (isDuplicate) {
          setError("nickname", {
            type: "invalid",
            message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.",
          });
          setIsNicknameValid(false);
        } else {
          setIsNicknameValid(true);
        }
      }
    };

    validate();
  }, [nickname, setError]);

  return (
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <div className={cx("form-input")}>
        <EmailInputController
          name="email"
          control={control}
          condition={SIGN_UP_EMAIL_CONDITION.email}
          setError={setError}
          isEmailValid={isEmailValid}
          setIsEmailValid={setIsEmailValid}
        />
        <div className={cx("form-input-except-email")}>
          {(Object.keys(SIGN_UP_CONDITION) as Array<keyof typeof SIGN_UP_CONDITION>).map((key) => (
            <SignInputController
              key={key}
              name={key}
              control={control}
              condition={SIGN_UP_CONDITION[key]}
              setError={setError}
            />
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
