import { Control, Controller, FieldValues, Path } from "react-hook-form";
import QuillEditor from "./Quill";

interface QuillEditorControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
}

const QuillEditorController = <ControlType extends FieldValues>({
  formFieldName,
  control,
}: QuillEditorControllerProps<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <QuillEditor onChange={(value) => field.onChange(value)} value={field.value} />}
    />
  );
};

export default QuillEditorController;
