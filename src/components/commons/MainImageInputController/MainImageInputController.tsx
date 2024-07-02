import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MainImageInput from "../MainImageInput/MainImageInput";

interface MainImageInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

function MainImageInputController<ControlType extends FieldValues>({
  formFieldName,
  control,
}: MainImageInputControllerProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => <MainImageInput selectedImage={field.value} onChange={field.onChange} />}
    />
  );
}

export default MainImageInputController;
