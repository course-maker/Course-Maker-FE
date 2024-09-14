import { useImageUpload } from "@/hooks/useImageUpload";

export const useHandleImageUpload = () => {
  const { uploadImageAsync } = useImageUpload();

  const handleImageUpload = async (file: File | File[]) => {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((item) => {
        formData.append("images", item);
      });

      const imageUrlArray = await uploadImageAsync(formData);
      return imageUrlArray;
    } else {
      formData.append("images", file);
      const imageUrlArray = await uploadImageAsync(formData);
      return imageUrlArray[0];
    }
  };

  return { handleImageUpload };
};
