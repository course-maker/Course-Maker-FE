import { useImageUpload } from "@/hooks/useImageUpload";

export const useHandleImageUpload = () => {
  const { uploadImageAsync } = useImageUpload();

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    const imageUrlArray = await uploadImageAsync(formData);
    return imageUrlArray[0];
  };

  return { handleImageUpload };
};
