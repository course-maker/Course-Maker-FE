import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TitleInput from "./TitleInput";

interface DestinationsInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
}

const DestinationsInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
}: DestinationsInputControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <TitleInput placeholder="여행지 이름을 입력하세요." disabled={disabled} {...field} />}
    />
  );
};

export default DestinationsInputController;
