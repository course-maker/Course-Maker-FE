import Button from "@/components/commons/Button";
import SignInputController from "@/components/commons/SignInputController";
import { StatusType } from "@/constants/emailAndCodeStatus";
import { inputOrder, SIGNUP_DEFAULT_VALUES } from "@/constants/signDefaultValues";
import { SIGN_UP_CONDITION, SIGN_UP_EMAIL_CONDITION } from "@/constants/signInputCondition";
import { useEmailAndCodeValidation } from "@/hooks/useEmailAndCodeValidation";
import { useNicknameValidation } from "@/hooks/useNicknameValidation";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";
import { SignUpFormInputs, signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import InputWithButtonController from "./InputWithButtonController";
import SignTerms from "./SignTerms";
import styles from "./SignUpForm.module.scss";

const cx = classNames.bind(styles);

const SignUpForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [areTermsAccepted, setAreTermsAccepted] = useState<boolean>(false);
  const [submitKey, setSubmitKey] = useState(0);

  const { control, formState, setError, watch, clearErrors, setValue, trigger, getValues, setFocus } =
    useForm<SignUpFormInputs>({
      resolver: zodResolver(signUpSchema),
      mode: "onChange",
      defaultValues: SIGNUP_DEFAULT_VALUES,
    });

  const { emailStatus, codeStatus, handleEmailButtonClick, handleCodeButtonClick, validateEmailAndCode } =
    useEmailAndCodeValidation(watch, setValue, setError, clearErrors);

  const nickname = watch("nickname");

  const {
    errors: { email: isEmailError, nickname: isNicknameError },
  } = useFormState({ control, name: ["email", "nickname"] });

  useNicknameValidation(nickname, Boolean(isNicknameError), setError);

  const { signUp } = useSignUpMutation();

  const customSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitKey((prev) => prev + 1);

      if (isEmailError) {
        await trigger(["password", "confirmPassword", "name", "nickname", "phoneNumber"]);
        return;
      } else {
        const isZodValid = await trigger();
        const isEmailAndCodeValid = validateEmailAndCode();

        if (!isEmailAndCodeValid || !isZodValid || !areTermsAccepted) {
          return;
        }

        const { email, name, nickname, password, phoneNumber } = getValues();
        // console.log({ email, name, nickname, password, phoneNumber });
        signUp({ email, name, nickname, password, phoneNumber });
      }
    },
    [isEmailError, trigger, validateEmailAndCode, areTermsAccepted, getValues, signUp],
  );

  useEffect(() => {
    const errors = formState.errors;

    if (emailStatus.status !== StatusType.SUCCESS) {
      setFocus("email");
      return;
    } else if (codeStatus.status !== StatusType.SUCCESS) {
      setFocus("code");
      return;
    }
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      const firstErrorField = inputOrder.find((field) => errors[field]);

      if (firstErrorField) {
        setFocus(firstErrorField);
      }
    }
  }, [formState.errors, submitKey, codeStatus.status, emailStatus.status, setFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  return (
    <form className={cx("form")} onSubmit={customSubmit} onKeyDown={handleKeyDown}>
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
