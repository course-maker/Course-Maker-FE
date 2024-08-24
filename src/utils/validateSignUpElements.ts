import { postCode, postEmail, postNickname } from "@/api/member";
import { validateCodeRequestDto, validateEmailRequestDto, validateNicknameRequestDto } from "@/api/member/type";
import { ErrorType, ERROR_MESSAGES, StatusType, STATUS_MESSAGES } from "@/constants/emailAndCodeStatus";
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { Status } from "@/type/type";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";

interface AxiosErrorResponse {
  errorType?: string;
}

let timerId: NodeJS.Timeout | undefined = undefined;

const startTimer = (
  setCodeStatus: Dispatch<SetStateAction<Status>>,
  setEmailStatus: Dispatch<SetStateAction<Status>>,
  clearErrors: UseFormClearErrors<SignUpFormInputs>,
  setError: UseFormSetError<SignUpFormInputs>,
) => {
  let timeLeft = 180;
  timerId = setInterval(() => {
    timeLeft -= 1;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    setCodeStatus({ status: StatusType.TIMER, message: STATUS_MESSAGES.code.timer(formattedTime) });

    if (timeLeft <= 0) {
      stopTimer();
      setEmailStatus({ status: StatusType.EXPIRED, message: STATUS_MESSAGES.email.expired });
      setCodeStatus({ status: StatusType.EXPIRED, message: STATUS_MESSAGES.code.expired });
      clearErrors("code");
      setError("email", {
        type: ErrorType.EXPIRED,
        message: ERROR_MESSAGES.email.expired,
      });
    }
  }, 1000);
};

export const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = undefined;
  }
};

export const validateEmail = async (
  email: string,
  setError: UseFormSetError<SignUpFormInputs>,
  setEmailStatus: Dispatch<SetStateAction<Status>>,
  setCodeStatus: Dispatch<SetStateAction<Status>>,
  clearErrors: UseFormClearErrors<SignUpFormInputs>,
) => {
  const emailForm: validateEmailRequestDto = { email };
  stopTimer();

  try {
    setEmailStatus({ status: StatusType.PENDING, message: STATUS_MESSAGES.email.pending });
    await postEmail(emailForm);
    setEmailStatus({ status: StatusType.SUCCESS, message: STATUS_MESSAGES.email.success });

    startTimer(setCodeStatus, setEmailStatus, clearErrors, setError);
  } catch (error) {
    setEmailStatus({ status: StatusType.FAIL, message: STATUS_MESSAGES.email.fail });
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 409)
      setError("email", {
        type: ErrorType.CONFLICT,
        message: ERROR_MESSAGES.email.conflict,
      });
    else
      setError("email", {
        type: ErrorType.UNKNOWN,
        message: ERROR_MESSAGES.email.unknown,
      });
  }
};

export const validateCode = async (
  email: string,
  code: string,
  setError: UseFormSetError<SignUpFormInputs>,
  setCodeStatus: Dispatch<SetStateAction<Status>>,
) => {
  const codeForm: validateCodeRequestDto = { email, code };

  try {
    await postCode(codeForm);
    setCodeStatus({ status: StatusType.SUCCESS, message: STATUS_MESSAGES.code.success });
    stopTimer();
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    const errorType = axiosError?.response?.data?.errorType;
    if (errorType === "Mismatch code")
      setError("code", {
        type: ErrorType.MISMATCH,
        message: ERROR_MESSAGES.code.mismatch,
      });
    else
      setError("code", {
        type: ErrorType.UNKNOWN,
        message: ERROR_MESSAGES.code.unknown,
      });
  }
};

export const validateNickname = async (nickname: string, setError: UseFormSetError<SignUpFormInputs>) => {
  const nicknameForm: validateNicknameRequestDto = { nickname };

  try {
    await postNickname(nicknameForm);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 409)
      setError("nickname", {
        type: ErrorType.CONFLICT,
        message: ERROR_MESSAGES.nickname.conflict,
      });
    else
      setError("nickname", {
        type: ErrorType.UNKNOWN,
        message: ERROR_MESSAGES.nickname.unknown,
      });
  }
};
