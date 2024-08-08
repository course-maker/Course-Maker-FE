import { SignField } from "@/constants/signInputCondition";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import CodeInput from "./CodeInput";

interface CodeInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  condition: SignField;
}

const CodeInputController = <T extends FieldValues>({ name, control, condition }: CodeInputControllerProps<T>) => {
  return <Controller name={name} control={control} render={() => <CodeInput condition={condition} />} />;
};
export default CodeInputController;
