import { SignField } from "@/constants/signInputCondition";
import { Status } from "@/type/type";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import InputWithButton from "./InputWithButton";

interface InputWithButtonControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
  status: Status;
  onClick: () => void;
}

const InputWithButtonController = <T extends FieldValues>({
  name,
  control,
  condition,
  status,
  onClick,
}: InputWithButtonControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputWithButton
          type={name}
          condition={condition}
          field={field}
          fieldState={fieldState}
          status={status}
          onClick={onClick}
        />
      )}
    />
  );
};
export default InputWithButtonController;
