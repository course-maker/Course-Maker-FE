import { Controller, Control, FieldValues, Path } from "react-hook-form";
import AddressSearchInput from "./AddressSearchInput";

interface AddressSearchProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

function AddressSearchController<ControlType extends FieldValues>({
  formFieldName,
  control,
}: AddressSearchProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => <AddressSearchInput selectedAddress={field.value} onChange={field.onChange} />}
    />
  );
}

export default AddressSearchController;
