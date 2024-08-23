import Button from "@/components/commons/Button";
import SignInputController from "@/components/commons/SignInputController";
import { SIGNUP_DEFAULT_VALUES } from "@/constants/signDefaultValues";
import { SIGN_UP_CONDITION, SIGN_UP_EMAIL_CONDITION } from "@/constants/signInputCondition";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { Status } from "@/type/type";
import { validateCode, validateEmail, validateNickname } from "@/utils/validateSignUpElements";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import InputWithButtonController from "./InputWithButtonController";
import SignTerms from "./SignTerms";
import styles from "./SignUpForm.module.scss";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [emailStatus, setEmailStatus] = useState<Status>({ status: "noSent", message: "" });
  const [codeStatus, setCodeStatus] = useState<Status>({ status: "noSent", message: "" });

  const [isEmailValid] = useState<boolean>(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState<boolean>(false);

  const { signUp } = useSignUpMutation();

  const { control, handleSubmit, setError, watch, clearErrors, setValue } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: SIGNUP_DEFAULT_VALUES,
  });

  const email = watch("email");
  const nickname = watch("nickname");
  const code = watch("code");

  const {
    errors: { nickname: isNicknameError },
  } = useFormState({ control, name: "nickname" });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  const onSubmit = (data: SignUpFormInputs) => {
    if (isEmailValid && areTermsAccepted) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...restData } = data;
      signUp(restData);
    } else {
      if (!isEmailValid) {
        setError("email", {
          type: "invalid",
          message: "이메일 중복 확인을 해주세요.",
        });
      }
    }
  };

  const handleEmailButtonClick = async () => {
    clearErrors("email");
    clearErrors("code");
    setValue("code", "");
    setCodeStatus({ status: "noSent", message: "" });

    await validateEmail(email, setError, setEmailStatus, setCodeStatus);
  };

  const handleCodeButtonClick = async () => {
    clearErrors("code");

    await validateCode(email, code, setError, setCodeStatus);
  };

  useEffect(() => {
    setEmailStatus({ status: "noSent", message: "" });
  }, [email]);

  useEffect(() => {
    if (nickname.length > 1 && !isNicknameError) {
      const timer = setTimeout(() => {
        validateNickname(nickname, setError);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [nickname, isNicknameError, setError]);

  return (
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <div className={cx("form-input")}>
        {(Object.keys(SIGN_UP_EMAIL_CONDITION) as Array<keyof typeof SIGN_UP_EMAIL_CONDITION>).map((key) => (
          <InputWithButtonController
            key={key}
            name={key}
            control={control}
            condition={SIGN_UP_EMAIL_CONDITION[key]}
            status={key === "email" ? emailStatus : codeStatus}
            onClick={key === "email" ? handleEmailButtonClick : handleCodeButtonClick}
          />
        ))}
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
      <SignTerms setAreTermsAccepted={setAreTermsAccepted} />
      <Button type="submit" color="blue" variant="primary" size="large" isSquare={true} ref={submitButtonRef}>
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;
