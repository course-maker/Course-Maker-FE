import { Controller, Control, FieldValues, Path, UseFormSetError } from "react-hook-form";
import { SignField } from "@/constants/signInputCondition";
import EmailInput from "./EmailInput";
import { SignUpFormInputs } from "@/schemas/signUpSchema";

interface SignInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
  isEmailValid: boolean;
  setError: UseFormSetError<SignUpFormInputs>;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailInputController = <T extends FieldValues>({
  name,
  control,
  condition,
  isEmailValid,
  setError,
  setIsEmailValid,
}: SignInputControllerProps<T>) => {
  const { defaultMessage, ...inputProps } = condition;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <EmailInput
          id={name}
          isError={!!fieldState.error}
          helperText={fieldState.error?.message || defaultMessage}
          emailValue={field.value}
          setError={setError}
          isEmailValid={isEmailValid}
          setIsEmailValid={setIsEmailValid}
          {...inputProps}
          {...field}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default EmailInputController;
