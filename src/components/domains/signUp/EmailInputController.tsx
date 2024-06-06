import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { SignField } from "@/constants/signInputCondition";
import EmailInput from "./EmailInput";

interface SignInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
}

const EmailInputController = <T extends FieldValues>({ name, control, condition }: SignInputControllerProps<T>) => {
  const { type, label, placeholder, maxLength, defaultMessage } = condition;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <EmailInput
          id={name}
          label={label}
          type={type}
          placeholder={placeholder}
          isError={!!fieldState.error}
          helperText={fieldState.error?.message || defaultMessage}
          maxLength={maxLength}
          emailValue={field.value}
          {...field}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default EmailInputController;
