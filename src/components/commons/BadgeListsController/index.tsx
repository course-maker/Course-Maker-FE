import BadgeLists from "@/components/commons/BadgeLists/BadgeLists";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface BadgeListsControllerProps<ControlType extends FieldValues> {
  type?: string;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const BadgeListsController = <ControlType extends FieldValues>({
  type,
  formFieldName,
  control,
}: BadgeListsControllerProps<ControlType>) => {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => {
        return <BadgeLists type={type} selectedBadges={field.value} onChange={field.onChange} />;
      }}
    />
  );
};

export default BadgeListsController;
