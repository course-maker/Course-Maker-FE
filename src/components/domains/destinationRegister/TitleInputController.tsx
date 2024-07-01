import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TitleInput from "./TitleInput";

interface TitleInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const TitleInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: TitleInputControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <TitleInput placeholder="여행지 이름을 입력하세요." {...field} />}
    />
  );
};

export default TitleInputController;
