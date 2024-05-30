import { SignInFormInputs } from "@/components/domains/signIn/SignInForm";
import { SIGN_IN_CONDITION } from "@/constants/signInputCondition";
import { Control, Controller } from "react-hook-form";
import SignInput from "../SignInput";

interface SignInputControllerProps {
  name: "id" | "password";
  control: Control<SignInFormInputs>;
}

const SignInputController = ({ name, control }: SignInputControllerProps) => {
  const { type, label, placeholder, rules, maxLength } = SIGN_IN_CONDITION[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <SignInput
          id={name}
          label={label}
          type={type}
          placeholder={placeholder}
          isError={!!fieldState.error}
          // isVerified={}
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
