import { forwardRef, InputHTMLAttributes, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./EmailInput.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import Dropdown from "./Dropdown";
import { z } from "zod"; // Zod import

const cx = classNames.bind(styles);

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  isError?: boolean;
  helperText?: string;
  setValue: UseFormSetValue<any>;
}

const emailSchema = z.string().email("올바른 이메일 주소를 입력해주세요."); // Zod 스키마 정의

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id, label, type, isError = false, helperText, setValue, ...props }, ref) => {
    const [emailId, setEmailId] = useState<string>("");
    const [domainValue, setDomainValue] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null); // 이메일 오류 메시지 상태

    const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\s/g, "");
      setEmailId(newValue);
      setEmailError(null); // 이메일을 수정할 때 오류 메시지 초기화
    };

    const checkEmailDuplication = () => {
      const fullEmail = `${emailId}@${domainValue}`;
      try {
        emailSchema.parse(fullEmail); // Zod를 이용한 이메일 검증
        setEmailError(null); // 이메일 양식이 유효한 경우 오류 메시지 초기화
        // 중복 검사 로직 추가
        // console.log(`Checking duplication for: ${fullEmail}`);
        setValue("email", fullEmail);
        // 여기서 중복 확인 후 결과에 따라 setEmailError를 업데이트 할 수 있습니다.
      } catch (e) {
        if (e instanceof z.ZodError) {
          setEmailError(e.errors[0].message); // Zod 오류 메시지 설정
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
          <p className={cx("helper-text", { error: isError || emailError })}>{emailError || helperText}</p>
        </div>
        <Button color="emerald" variant="primary" size="small" onClick={checkEmailDuplication}>
          중복확인
        </Button>
      </div>
    );
  },
);

export default EmailInput;
