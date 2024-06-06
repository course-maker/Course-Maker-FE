import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./EmailInput.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import Dropdown from "./Dropdown";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { postEmail } from "@/api/member";
import { validateEmailRequestDto } from "@/api/member/type";

const cx = classNames.bind(styles);
interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  label?: string;
  isError?: boolean;
  helperText?: string;
  emailValue: string;
  onChange: (fullEmail: string) => void;
}

const emailSchema = z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 주소를 입력해주세요.");

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, label, type, isError = false, helperText, emailValue, onChange, ...props }, ref) => {
    const [emailId, setEmailId] = useState<string>("");
    const [domainValue, setDomainValue] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isApiError, setIsApiError] = useState<boolean>(false);
    const [emailApiHelperText, setEmailApiHelperText] = useState<string>("");

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
          setIsApiError(true);
          setEmailApiHelperText("가입된 이메일 입니다. 다른 이메일을 입력해주세요.");
          setIsEmailValid(false);
        } else {
          setIsApiError(false);
          setEmailApiHelperText("사용 가능한 이메일 입니다.");
          setIsEmailValid(true);
        }
      } catch (e) {
        if (e instanceof z.ZodError) {
          setIsApiError(true);
          setEmailApiHelperText(e.errors[0].message);
          setIsEmailValid(false);
        }
      }
    };

    useEffect(() => {
      if (emailId || domainValue) {
        setIsApiError(false);
        setEmailApiHelperText("");
        const fullEmail = `${emailId}@${domainValue}`;
        onChange(fullEmail);
      }
    }, [domainValue, emailId, onChange]);

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
                disabled={isEmailValid}
              />
              <span className={cx("input-group-address")}>@</span>
              <Dropdown domainValue={domainValue} setDomainValue={setDomainValue} isDisabled={isEmailValid} />
            </div>
          </div>
          <p className={cx("helper-text", { error: isError || isApiError, verified: isEmailValid })}>
            {emailApiHelperText || helperText}
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
