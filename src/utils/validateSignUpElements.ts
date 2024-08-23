import { postCode, postEmail, postNickname } from "@/api/member";
import { validateCodeRequestDto, validateEmailRequestDto, validateNicknameRequestDto } from "@/api/member/type";
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { Status } from "@/type/type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";

interface AxiosErrorResponse {
  errorType?: string;
}

let timerId: NodeJS.Timeout | undefined = undefined;

export const validateCode = async (
  email: string,
  code: string,
  setError: UseFormSetError<SignUpFormInputs>,
  setCodeStatus: Dispatch<SetStateAction<Status>>,
) => {
  const codeForm: validateCodeRequestDto = { email, code };

  try {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }
    await postCode(codeForm);
    setCodeStatus({ status: "success", message: "인증이 완료되었습니다." });
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    const errorType = axiosError?.response?.data?.errorType;
    if (errorType === "Mismatch code")
      setError("code", {
        type: "invalid",
        message: "인증코드가 일치하지 않습니다.",
      });
    else if (errorType === "Invalid item")
      setError("code", {
        type: "invalid",
        message: "인증코드를 전송한 이메일과 일치하지 않습니다.",
      });
    else console.error("인증 코드 검증 중 오류 발생:", error);
  }
};

export const validateEmail = async (
  email: string,
  setError: UseFormSetError<SignUpFormInputs>,
  setEmailStatus: Dispatch<SetStateAction<Status>>,
  setCodeStatus: Dispatch<SetStateAction<Status>>,
) => {
  const emailForm: validateEmailRequestDto = { email };
  if (timerId) {
    clearInterval(timerId);
  }

  try {
    setEmailStatus({ status: "pending", message: "인증코드를 전송중입니다." });
    await postEmail(emailForm);
    setEmailStatus({ status: "success", message: "이메일로 인증코드를 발송하였습니다." });

    let timeLeft = 10;
    timerId = setInterval(() => {
      timeLeft -= 1;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      setCodeStatus({ status: "timer", message: `인증코드 유효 시간 ${formattedTime}` });

      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = undefined;
        setCodeStatus({ status: "expired", message: "" });
        setEmailStatus({ status: "expired", message: "" });
        setError("email", {
          type: "expired",
          message: "인증코드가 만료되었습니다. 재전송해 주세요.",
        });
      }
    }, 1000);
  } catch (error) {
    setEmailStatus({ status: "fail", message: "" });
    const axiosError = error as AxiosError;
    const duplicateErrorCode = axiosError?.response?.status;
    if (duplicateErrorCode === 409)
      setError("email", {
        type: "apiFail",
        message: "가입된 이메일 입니다. 다른 이메일을 입력해주세요.",
      });
    else console.error("이메일 검증 중 오류 발생:", error);
  }
};

export const validateNickname = async (nickname: string, setError: UseFormSetError<SignUpFormInputs>) => {
  const nicknameForm: validateNicknameRequestDto = { nickname };

  try {
    await postNickname(nicknameForm);
  } catch (error) {
    const axiosError = error as AxiosError;
    const duplicateErrorCode = axiosError?.response?.status;
    if (duplicateErrorCode === 409)
      setError("nickname", {
        type: "invalid",
        message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.",
      });
    else console.error("닉네임 검증 중 오류 발생:", error);
  }
};
