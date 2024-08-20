import BadgeLists from "@/components/commons/BadgeLists/BadgeLists";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

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
        return <BadgeLists selectedBadges={field.value} onChange={field.onChange} forSearch={false} />;
      }}
    />
  );
};

export default BadgeListsController;
