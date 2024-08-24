import Button from "@/components/commons/Button";
import SignInputController from "@/components/commons/SignInputController";
import { SIGNUP_DEFAULT_VALUES } from "@/constants/signDefaultValues";
import { SIGN_UP_CONDITION, SIGN_UP_EMAIL_CONDITION } from "@/constants/signInputCondition";
import { useEmailAndCodeValidation } from "@/hooks/useEmailAndCodeValidation";
import { useNicknameValidation } from "@/hooks/useNicknameValidation";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import InputWithButtonController from "./InputWithButtonController";
import SignTerms from "./SignTerms";
import styles from "./SignUpForm.module.scss";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [areTermsAccepted, setAreTermsAccepted] = useState<boolean>(false);

  const { control, handleSubmit, setError, watch, clearErrors, setValue } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: SIGNUP_DEFAULT_VALUES,
  });

  const { emailStatus, codeStatus, handleEmailButtonClick, handleCodeButtonClick } = useEmailAndCodeValidation(
    watch,
    setValue,
    setError,
    clearErrors,
  );

  const nickname = watch("nickname");

  const {
    errors: { nickname: isNicknameError },
  } = useFormState({ control, name: "nickname" });

  useNicknameValidation(nickname, Boolean(isNicknameError), setError);

  const { signUp } = useSignUpMutation();

  const onSubmit = (data: SignUpFormInputs) => {
    if (emailStatus && codeStatus && areTermsAccepted) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...restData } = data;
      signUp(restData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

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
