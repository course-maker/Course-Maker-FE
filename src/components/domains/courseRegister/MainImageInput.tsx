import React, { useRef } from "react";
import DestinationDetailsInput from "../spotRegister/DestinationDetailsInput";

interface MainImageInputProps {
  selectedImage: File | null;
  onChange: (updatedImage: File | null) => void;
}

const MainImageInput = ({ selectedImage, onChange }: MainImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <DestinationDetailsInput
        title="대표 이미지"
        buttonName="파일첨부"
        placeholder="대표 이미지를 첨부해주세요."
        helperText="대표 이미지는 1개, 15MB 이하입니다."
        selectedOption={selectedImage ? selectedImage.name : ""}
        onButtonClick={handleButtonClick}
      />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageAttach} />
    </>
  );
};

export default MainImageInput;
