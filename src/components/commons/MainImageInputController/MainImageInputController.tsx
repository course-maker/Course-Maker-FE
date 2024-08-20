import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MainImageInput from "../MainImageInput/MainImageInput";

interface MainImageInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
}

function MainImageInputController<ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
}: MainImageInputControllerProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <MainImageInput selectedImage={field.value} onChange={field.onChange} disabled={disabled} />
      )}
    />
  );
}

export default MainImageInputController;
