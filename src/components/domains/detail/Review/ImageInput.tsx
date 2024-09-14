import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { ReviewFormType } from "@/type/type";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./ImageInput.module.scss";

const cx = classNames.bind(styles);

interface ImageInputProps {
  control: Control<ReviewFormType>;
}

const ImageInput = ({ control }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Controller
      name="images"
      control={control}
      render={({ field }) => {
        const handleClick = () => {
          if (field.value && field.value.length === 5)
            return setErrorMessage("이미지는 최대 5개까지 업로드할 수 있습니다.");

          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        };

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target.files) return;

          const newFiles = Array.from(event.target.files);
          const totalFiles = (field.value ? field.value.length : 0) + newFiles.length;

          if (totalFiles > 5) {
            setErrorMessage("이미지는 최대 5개까지 업로드할 수 있습니다.");
            return;
          }

          setErrorMessage(null);

          const updatedFiles = [...(field.value || []), ...newFiles];
          field.onChange(updatedFiles);
        };

        const handleRemoveImage = (index: number) => {
          const updatedFiles = (field.value || []).filter((_, i) => i !== index);
          field.onChange(updatedFiles);
        };

        return (
          <div className={cx("container")}>
            <div className={cx("image-input")}>
              <input
                className={cx("input")}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className={cx("images")}>
                <div className={cx("add-btn")} onClick={handleClick}>
                  <div className={cx("icon")}>
                    <Image imageInfo={IMAGES.addFile} />
                  </div>
                </div>

                <div className={cx("preview")}>
                  {field.value &&
                    field.value.map((item, index) => (
                      <div key={index} className={cx("preview-item")}>
                        {typeof item === "string" ? ( // 기존 이미지 URL인 경우
                          <img src={item} alt={`Preview ${index}`} />
                        ) : (
                          <img src={URL.createObjectURL(item)} alt={`Preview ${index}`} />
                        )}
                        <button type="button" onClick={() => handleRemoveImage(index)}>
                          <Image imageInfo={IMAGES.modalClose} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <p className={cx("error-message")}>{errorMessage}</p>
          </div>
        );
      }}
    />
  );
};

export default ImageInput;
