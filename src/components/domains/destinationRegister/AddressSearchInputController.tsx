import { Controller, Control, FieldValues, Path } from "react-hook-form";
import AddressSearchInput from "./AddressSearchInput";

interface AddressSearchInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

function AddressSearchInputController<ControlType extends FieldValues>({
  formFieldName,
  control,
}: AddressSearchInputControllerProps<ControlType>) {
  return (
    <Controller
      control={control}
      name={formFieldName}
      render={({ field }) => <AddressSearchInput selectedAddress={field.value} onChange={field.onChange} />}
    />
  );
}

export default AddressSearchInputController;
