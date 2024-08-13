import QuillEditor from "@/components/commons/QuillEditor";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface QuillEditorControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  placeholder?: string;
}

const QuillEditorController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  placeholder,
}: QuillEditorControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => (
        <QuillEditor value={field.value} placeholder={placeholder} onChange={(value) => field.onChange(value)} />
      )}
    />
  );
};

export default QuillEditorController;
