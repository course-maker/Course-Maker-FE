import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

import CustomToolbar from "./CustomToolbar";
import { useImageUpload } from "@/hooks/useImageUpload";

import "react-quill/dist/quill.snow.css";
import "./QuillEditor.scss";

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
  "image",
];

const QuillEditor = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { uploadImageAsync } = useImageUpload();

  const imageHandler = () => {
    const input = document.createElement("input");
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
            const result = await uploadImageAsync({ formData });
            const IMG_URL = result[0];
            editor.insertEmbed(range.index, "image", IMG_URL);
          }
        }
      }
    });
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const modules = {
  //   toolbar: {
  //     container: "#toolbar",
  //     handlers: {
  //       image: imageHandler,
  //     },
  //   },
  //   ImageResize: {
  //     parchment: Quill.import("parchment"),
  //     modules: ["Resize", "DisplaySize", "Toolbar"],
  //   },
  // };

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
          placeholder="여행지를 소개해주세요!"
        />
      </div>
    </div>
  );
};

export default QuillEditor;
