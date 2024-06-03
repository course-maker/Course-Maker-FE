import { Controller, Control } from "react-hook-form";
import SignInput from "../SignInput";
import { SignInFormInputs } from "@/schemas/signInSchema";
import { signInCondition } from "@/constants/signInputCondition";

interface SignInputControllerProps {
  name: "id" | "password";
  control: Control<SignInFormInputs>;
}

const SignInputController = ({ name, control }: SignInputControllerProps) => {
  const { type, label, placeholder, maxLength } = signInCondition[name];

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
          helperText={fieldState.error?.message}
          maxLength={maxLength}
          {...field}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\s/g, "");
            field.onChange(newValue);
          }}
        />
      )}
    />
  );
};
export default SignInputController;
