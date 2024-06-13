import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BadgeLists from "../courseRegister/BadgeLists";

interface BadgeListsControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const BadgeListsController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: BadgeListsControllerProps<ControlType>) => {
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

export default BadgeListsController;
