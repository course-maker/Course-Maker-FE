import { useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { postImage } from "@/api/image";

export const useImageUpload = (onChange: (updatedImage: string) => void) => {
  const [inputFileName, setInputFileName] = useState<string>("");

  const { mutate: uploadImage, ...rest } = useMutation({
    mutationFn: (data: { formData: FormData; fileName: string }) => postImage(data.formData),
    onSuccess: (imageUrl, data) => {
      onChange(imageUrl[0]);
      setInputFileName(data.fileName);
    },
    onError: (error: AxiosError) => {
      onChange("");
      setInputFileName("");

      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 400:
          alert("파일 크기가 너무 커서 업로드할 수 없습니다. 15MB 이하의 이미지로 다시 시도해주세요.");
          break;
        default:
          alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return { inputFileName, uploadImage, ...rest };
};
