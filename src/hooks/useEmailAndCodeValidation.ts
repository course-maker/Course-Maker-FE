// hooks/useEmailValidation.ts
import { StatusType, STATUS_MESSAGES } from "@/constants/emailAndCodeStatus";
import { SignUpFormInputs } from "@/schemas/signUpSchema";
import { Status } from "@/type/type";
import { stopTimer, validateCode, validateEmail } from "@/utils/validateSignUpElements";
import { useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetError, UseFormSetValue, UseFormWatch } from "react-hook-form";

export const useEmailAndCodeValidation = (
  watch: UseFormWatch<SignUpFormInputs>,
  setValue: UseFormSetValue<SignUpFormInputs>,
  setError: UseFormSetError<SignUpFormInputs>,
  clearErrors: UseFormClearErrors<SignUpFormInputs>,
) => {
  const [emailStatus, setEmailStatus] = useState<Status>({
    status: StatusType.UNVERIFIED,
    message: STATUS_MESSAGES.email.unverified,
  });
  const [codeStatus, setCodeStatus] = useState<Status>({
    status: StatusType.UNVERIFIED,
    message: STATUS_MESSAGES.code.unverified,
  });

  const email = watch("email");
  const code = watch("code");

  const handleEmailButtonClick = async () => {
    clearErrors("email");
    clearErrors("code");
    setValue("code", "");
    setCodeStatus({ status: StatusType.UNVERIFIED, message: STATUS_MESSAGES.code.unverified });
    await validateEmail(email, setError, setEmailStatus, setCodeStatus, clearErrors);
  };

  const handleCodeButtonClick = async () => {
    clearErrors("code");
    await validateCode(email, code, setError, setCodeStatus);
  };

  useEffect(() => {
    setEmailStatus({ status: StatusType.UNVERIFIED, message: STATUS_MESSAGES.email.unverified });
    setCodeStatus({ status: StatusType.UNVERIFIED, message: STATUS_MESSAGES.code.unverified });
    stopTimer();
  }, [email]);

  return { emailStatus, codeStatus, handleEmailButtonClick, handleCodeButtonClick };
};
