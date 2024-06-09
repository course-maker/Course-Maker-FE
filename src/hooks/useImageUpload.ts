import { useMutation } from "@tanstack/react-query";
import { postImage } from "@/api/image";
import { AxiosError } from "axios";

export const useImageUpload = (onChange: (updatedImage: string) => void) => {
  const { mutate: upload, ...rest } = useMutation({
    mutationFn: (enteredImageFile: FormData) => postImage(enteredImageFile),
    onSuccess: (imageUrl) => {
      onChange(imageUrl[0]);
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 400:
          alert("파일 크기가 너무 커서 업로드할 수 없습니다. 5MB 이하의 이미지로 다시 시도해주세요.");
          break;
        default:
          alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return { upload, ...rest };
};
