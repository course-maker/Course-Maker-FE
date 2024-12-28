import Text from "@/components/commons/Text";

import classNames from "classnames/bind";
import styles from "./UpdateUserInfo.module.scss";
const cx = classNames.bind(styles);

const UpdateUserInfo = () => {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setAuth(true);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("items")}>
        {auth ? (
          <UserForm />
        ) : (
          <div className={cx("auth-form")}>
            <Text className={cx("auth-form-txt")} text="회원정보변경을 위해 사용자 인증이 필요합니다." />
            <Text className={cx("auth-form-txt")} text="비밀번호를 입력해주세요." />
            <form onSubmit={handlePasswordSubmit}>
              <input
                className={cx("input-field")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
              <Button type="submit" color="blue" variant="primary" size="large" isSquare={true}>
                비밀번호 확인
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUserInfo;

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
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";

const UserForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [submitKey, setSubmitKey] = useState(0);

  const { control, formState, setError, watch, clearErrors, setValue, trigger, getValues, setFocus } =
    useForm<SignUpFormInputs>({
      resolver: zodResolver(signUpSchema),
      mode: "onChange",
      defaultValues: SIGNUP_DEFAULT_VALUES,
    });

  const { emailStatus, codeStatus, validateEmailAndCode } = useEmailAndCodeValidation(
    watch,
    setValue,
    setError,
    clearErrors,
  );

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

        if (!isZodValid) {
          alert("회원정보입력을 잘못하셨습니다");
          return;
        }
        const { email, name, nickname, password, phoneNumber } = getValues();
        alert("회원정보변경 완료");
        console.log({ email, name, nickname, password, phoneNumber });
        // signUp({ email, name, nickname, password, phoneNumber });
      }
    },
    [isEmailError, trigger, validateEmailAndCode, getValues, signUp],
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
        <div className={cx("form-input-except-email")}>
          <SignInputController
            name="email"
            control={control}
            condition={SIGN_UP_EMAIL_CONDITION["email"]}
            setError={setError}
            disabled={true}
          />
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

      <Button type="submit" color="blue" variant="primary" size="large" isSquare={true} ref={submitButtonRef}>
        회원정보변경
      </Button>
    </form>
  );
};

UserForm;
