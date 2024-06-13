import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MainImageInput from "./MainImageInput";

interface MainImageInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const MainImageInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: MainImageInputControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => (
        <MainImageInput
          selectedImage={field.value}
          onChange={(file: File | null) => {
            if (file) {
              field.onChange(file);
            } else {
              field.onChange(null);
            }
          }}
        />
      )}
    />
  );
};

export default MainImageInputController;
