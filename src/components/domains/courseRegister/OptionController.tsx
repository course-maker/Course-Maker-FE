import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Slider from "./SliderBar";
interface OptionControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const OptionController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: OptionControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <Slider type={formFieldName} value={field.value} onChange={field.onChange} />}
    />
  );
};

export default OptionController;
