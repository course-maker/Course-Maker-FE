import { useRef, useState } from "react";
import DestinationDetailsInput from "../../domains/destinationRegister/DestinationDetailsInput";

interface MainImageInputProps {
  selectedImage: string;
  onChange: (updatedImage: File | null) => void;
  disabled?: boolean;
}

const MainImageInput = ({ selectedImage, onChange, disabled }: MainImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputFileName, setInputFileName] = useState<string>("");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 15 * 1024 * 1024) {
        alert("파일 크기가 너무 커서 업로드할 수 없습니다. 15MB 이하의 이미지로 다시 시도해주세요.");
      } else {
        setInputFileName(file.name);
        onChange(file);
      }

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
        selectedOption={inputFileName || selectedImage}
        onButtonClick={handleButtonClick}
        disabled={disabled}
      />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageAttach} />
    </>
  );
};

export default MainImageInput;
