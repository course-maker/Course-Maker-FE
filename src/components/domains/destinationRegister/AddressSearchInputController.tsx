import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AddressSearchInput from "./AddressSearchInput";

interface AddressSearchInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
}

function AddressSearchInputController<ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
}: AddressSearchInputControllerProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <AddressSearchInput selectedAddress={field.value} onChange={field.onChange} disabled={disabled} />
      )}
    />
  );
}

export default AddressSearchInputController;
