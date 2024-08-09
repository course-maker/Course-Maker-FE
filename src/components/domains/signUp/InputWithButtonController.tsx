import { SignField } from "@/constants/signInputCondition";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import InputWithButton from "./InputWithButton";

interface InputWithButtonControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
}

const InputWithButtonController = <T extends FieldValues>({
  name,
  control,
  condition,
}: InputWithButtonControllerProps<T>) => {
  return (
    <Controller name={name} control={control} render={() => <InputWithButton type={name} condition={condition} />} />
  );
};
export default InputWithButtonController;
