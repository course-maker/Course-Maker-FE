import ImageResize from "quill-image-resize-module-react";
import { useCallback, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";

import { useImageUpload } from "@/hooks/useImageUpload";
import CustomImage from "@/utils/CustomImageBlot";
import CustomToolbar from "./CustomToolbar";

import "react-quill/dist/quill.snow.css";
import "./QuillEditor.scss";

Quill.register("formats/customImage", CustomImage);
Quill.register("modules/ImageResize", ImageResize);

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "link",
  "align",
  "color",
  "background",
  "customImage",
];

interface QuillEditorProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ value, placeholder, onChange }: QuillEditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { uploadImageAsync } = useImageUpload();

  const imageHandler = useCallback(() => {
    const input = document.createElement("input") as HTMLInputElement;
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("images", file);

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection();
          if (range) {
            try {
              const result = await uploadImageAsync(formData);
              const IMG_URL = result[0];
              editor.insertEmbed(range.index, "customImage", { url: IMG_URL });
            } catch (error) {
              console.error("Image upload failed:", error);
            }
          }
        }
      }
    });
  }, [uploadImageAsync]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, [imageHandler]);

  return (
    <div>
      <CustomToolbar />
      <div>
        <ReactQuill
          ref={quillRef}
          value={value}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default QuillEditor;
