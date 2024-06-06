import { forwardRef, InputHTMLAttributes, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./EmailInput.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import Dropdown from "./Dropdown";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { postEmail } from "@/api/member";
import { validateEmailRequestDto } from "@/api/member/type";

const cx = classNames.bind(styles);

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  isError?: boolean;
  helperText?: string;
  isEmailValid: boolean;
  setValue: UseFormSetValue<any>;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const emailSchema = z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 주소를 입력해주세요.");

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, label, type, isError = false, helperText, isEmailValid, setValue, setIsEmailValid, ...props }, ref) => {
    const [emailId, setEmailId] = useState<string>("");
    const [domainValue, setDomainValue] = useState<string>("");
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [emailHelperText, setEmailHelperText] = useState<string>("");

    const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\s/g, "");
      setEmailId(newValue);
      setIsEmailError(false);
      setEmailHelperText("");
    };

    const { mutateAsync: mutateAsyncForEmail } = useMutation({
      mutationFn: (enteredEmailInInfo: validateEmailRequestDto) => postEmail(enteredEmailInInfo),
    });

    const validateEmail = async () => {
      const fullEmail = `${emailId}@${domainValue}`;
      const emailForm = { email: fullEmail };
      try {
        emailSchema.parse(fullEmail);
        setIsEmailError(false);
        setEmailHelperText("");
        const response = await mutateAsyncForEmail(emailForm);
        const isDuplicate = response.isDuplicate;

        if (isDuplicate) {
          setIsEmailError(true);
          setEmailHelperText("가입된 이메일 입니다. 다른 이메일을 입력해주세요.");
          setIsEmailValid(false);
        } else {
          setIsEmailError(false);
          setEmailHelperText("사용 가능한 이메일 입니다.");
          setIsEmailValid(true);
        }
        setValue("email", fullEmail);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setIsEmailError(true);
          setEmailHelperText(e.errors[0].message); // Zod 오류 메시지 설정
          setIsEmailValid(false);
        }
      }
    };
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
                {...props}
                value={emailId}
                onChange={handleEmailIdChange}
              />
              <span className={cx("input-group-address")}>@</span>
              <Dropdown domainValue={domainValue} setDomainValue={setDomainValue} />
            </div>
          </div>
          <p className={cx("helper-text", { error: isError || isEmailError, verified: isEmailValid })}>
            {emailHelperText || helperText}
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
