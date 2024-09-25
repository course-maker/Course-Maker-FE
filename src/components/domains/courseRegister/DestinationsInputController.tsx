import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TravelCourseOnMap from "./TravelCourseOnMap";
import { CourseDestination } from "@/api/course/type";
interface DestinationsInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
  duration: number;
}

const DestinationsInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
  duration,
}: DestinationsInputControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const handleSelect = (value: CourseDestination[]) => {
          field.onChange(value);
        };
        return (
          <TravelCourseOnMap
            courseDetail={field.value}
            disabled={disabled}
            duration={duration}
            {...field}
            handleSelect={handleSelect}
          />
        );
      }}
    />
  );
};

export default DestinationsInputController;
