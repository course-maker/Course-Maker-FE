import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BadgeLists from "./BadgeLists";

interface BadgeListControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const BadgeListController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: BadgeListControllerProps<ControlType>) => {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => {
        return <BadgeLists selectedDestinationBadges={field.value} onChange={field.onChange} />;
      }}
    />
  );
};

export default BadgeListController;
