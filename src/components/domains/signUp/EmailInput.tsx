import { postEmail } from "@/api/member";
import { validateEmailRequestDto } from "@/api/member/type";
import Button from "@/components/commons/Button";
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import Dropdown from "./Dropdown";
import styles from "./EmailInput.module.scss";

const cx = classNames.bind(styles);
interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  isError?: boolean;
  helperText?: string;
  emailValue: string;
  isEmailValid: boolean;
  setError: UseFormSetError<SignUpFormInputs>;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (fullEmail: string) => void;
}

const emailSchema = z.string().min(1, "이메일 주소를 입력해주세요.").email("올바른 이메일 주소를 입력해주세요.");

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    { id, type, isError = false, helperText, emailValue, isEmailValid, setError, setIsEmailValid, onChange, ...props },
    ref,
  ) => {
    const [emailId, setEmailId] = useState<string>("");
    const [domainValue, setDomainValue] = useState<string>("");
    const [emailVerifiedHelperText, setEmailVerifiedHelperText] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const isMounted = useRef(false);

    const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\s/g, "");
      setEmailId(newValue);
    };

    const { mutateAsync: mutateAsyncForEmail } = useMutation({
      mutationFn: (enteredEmailInInfo: validateEmailRequestDto) => postEmail(enteredEmailInInfo),
    });

    const validateEmail = async () => {
      const emailForm = { email: emailValue };
      try {
        emailSchema.parse(emailValue);
        const response = await mutateAsyncForEmail(emailForm);
        const isDuplicate = response.isDuplicate;

        if (isDuplicate) {
          setError("email", {
            type: "invalid",
            message: "가입된 이메일입니다. 다른 이메일을 입력해주세요.",
          });
        } else {
          setEmailVerifiedHelperText("사용 가능한 이메일입니다.");
          setIsEmailValid(true);
        }
        setIsChecked(true);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setError("email", {
            type: "invalid",
            message: e.errors[0].message,
          });
        } else {
          setError("email", {
            type: "invalid",
            message: "이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.",
          });
        }
      }
    };

    const updateEmailValue = async () => {
      setIsChecked(false);
      setIsEmailValid(false);
      setEmailVerifiedHelperText("");

      if (emailId || domainValue) {
        const fullEmail = `${emailId}@${domainValue}`;
        await onChange(fullEmail);

        if (emailSchema.parse(fullEmail) && !isChecked && emailId && domainValue) {
          setError("email", {
            type: "duplicate",
            message: "이메일 중복 확인을 해주세요.",
          });
        }
      } else {
        onChange("");
      }
    };

    useEffect(() => {
      if (isMounted.current) {
        updateEmailValue();
      } else {
        isMounted.current = true;
      }
    }, [emailId, domainValue]);

    return (
      <div className={cx("container")}>
        <div className={cx("inner-box")}>
          <div className={cx("input")}>
            <input
              className={cx("input-group-field", { error: isError })}
              ref={ref}
              id={id}
              type={type}
              onChange={handleEmailIdChange}
              {...props}
              value={emailId}
            />
            <span className={cx("input-group-address")}>@</span>
            <Dropdown isError={isError} domainValue={domainValue} setDomainValue={setDomainValue} />
          </div>
          <p className={cx("helper-text", { error: isError, verified: isEmailValid })}>
            {emailVerifiedHelperText || helperText}
          </p>
        </div>
        <Button color="blue" variant="primary" size="medium" onClick={validateEmail}>
          인증코드 받기
        </Button>
      </div>
    );
  },
);

export default EmailInput;
