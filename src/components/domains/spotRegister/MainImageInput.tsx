import { useRef } from "react";
import DestinationDetailsInput from "./DestinationDetailsInput";
import { useImageUpload } from "@/hooks/useImageUpload";

interface MainImageInputProps {
  selectedImage: string;
  onChange: (updatedImage: string) => void;
}

const MainImageInput = ({ selectedImage, onChange }: MainImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { upload } = useImageUpload(onChange);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("images", file);
      upload(formData);
    }
  };

  return (
    <>
      <DestinationDetailsInput
        title="대표 이미지"
        buttonName="파일첨부"
        placeholder="대표이미지를 첨부해주세요."
        selectedOption={selectedImage}
        onButtonClick={handleButtonClick}
      />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageAttach} />
    </>
  );
};

export default MainImageInput;
