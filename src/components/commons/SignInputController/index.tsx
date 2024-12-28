import { SignField } from "@/constants/signInputCondition";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Control, Controller, FieldValues, Path, UseFormSetError } from "react-hook-form";
import SignInput from "../SignInput";

interface SignInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
  setError?: UseFormSetError<T> | undefined;
  disabled?: boolean;
}

const SignInputController = <T extends FieldValues>({
  name,
  control,
  condition,
  disabled = false,
}: SignInputControllerProps<T>) => {
  const { defaultMessage, type, ...inputProps } = condition;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SignInput
          id={name}
          type={type}
          isError={!!fieldState.error}
          disabled={disabled}
          helperText={fieldState.error?.message || defaultMessage}
          {...inputProps}
          {...field}
          onChange={(e) => {
            if (type === "tel") {
              field.onChange(formatPhoneNumber(e.target.value));
            } else {
              const newValue = e.target.value.replace(/\s/g, "");
              field.onChange(newValue);
            }
          }}
        />
      )}
    />
  );
};

export default SignInputController;
