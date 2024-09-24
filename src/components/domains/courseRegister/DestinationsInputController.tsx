import { Control, Controller, FieldValues, Path } from "react-hook-form";

import TravelCourseOnMap from "./TravelCourseOnMap";

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
      render={({ field }) => <TravelCourseOnMap courseDetail={field.value} disabled={disabled} {...field} />}
    />
  );
};

export default DestinationsInputController;
