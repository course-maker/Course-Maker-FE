import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TitleInput from "./TitleInput";

interface TitleInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
}

const TitleInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
}: TitleInputControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <TitleInput placeholder="코스 이름을 입력하세요." disabled={disabled} {...field} />}
    />
  );
};

export default TitleInputController;
