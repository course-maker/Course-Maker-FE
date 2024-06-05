import { Controller, Control, FieldValues, Path } from "react-hook-form";
import SignInput from "../SignInput";
import { SignField } from "@/constants/signInputCondition";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface SignInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
}

const SignInputController = <T extends FieldValues>({ name, control, condition }: SignInputControllerProps<T>) => {
  const { type, label, placeholder, maxLength, defaultMessage } = condition;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SignInput
          id={name}
          label={label}
          type={type}
          placeholder={placeholder}
          isError={!!fieldState.error}
          helperText={fieldState.error?.message || defaultMessage}
          maxLength={maxLength}
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
