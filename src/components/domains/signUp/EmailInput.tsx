import { forwardRef, InputHTMLAttributes, useEffect, useState, useRef } from "react";
import { UseFormSetError } from "react-hook-form";
import styles from "./EmailInput.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import Dropdown from "./Dropdown";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { postEmail } from "@/api/member";
import { validateEmailRequestDto } from "@/api/member/type";
import { SignUpFormInputs } from "@/schemas/signUpSchema";

const cx = classNames.bind(styles);
interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  label?: string;
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
    {
      id,
      label,
      type,
      isError = false,
      helperText,
      emailValue,
      isEmailValid,
      setError,
      setIsEmailValid,
      onChange,
      ...props
    },
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
            {label && (
              <label className={cx("input-label")} htmlFor={id}>
                {label}
              </label>
            )}
            <div className={cx("input-group")}>
              <input
                className={cx("input-group-field")}
                ref={ref}
                id={id}
                type={type}
                onChange={handleEmailIdChange}
                {...props}
                value={emailId}
              />
              <span className={cx("input-group-address")}>@</span>
              <Dropdown domainValue={domainValue} setDomainValue={setDomainValue} />
            </div>
          </div>
          <p className={cx("helper-text", { error: isError, verified: isEmailValid })}>
            {emailVerifiedHelperText || helperText}
          </p>
        </div>
        <Button color="emerald" variant="primary" size="small" onClick={validateEmail}>
          중복확인
        </Button>
      </div>
    );
  },
);

export default EmailInput;
