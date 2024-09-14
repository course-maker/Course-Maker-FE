import { useHandleImageUpload } from "@/hooks/useFormImageUpload";
import { ReviewFormType } from "@/type/type";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageInput from "./ImageInput";
import StarRating from "./StarRating";
import TextInput from "./TextInput";

interface ReviewFormProps {
  initialData?: ReviewFormType;
}

const ReviewForm = ({ initialData }: ReviewFormProps) => {
  const { handleImageUpload } = useHandleImageUpload();
  const { handleSubmit, control } = useForm<ReviewFormType>({
    defaultValues: initialData || {
      rating: 0,
      content: "",
      images: null,
    },
  });

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (formData) => {
  //     if (initialData) {
  //       return axios.put(`/api/reviews/${initialData.id}`, formData);
  //     } else {
  //       return axios.post("/api/reviews", formData);
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("reviews");
  //     alert("리뷰가 성공적으로 등록되었습니다!");
  //   },
  //   onError: () => {
  //     alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
  //   },
  // });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.images && data.images.length > 0) {
      data.images = await handleImageUpload(data.images);
    }
    console.log(data);
    // mutation.mutate(data);
  };

  // useEffect(() => {
  //   if (initialData) {
  //     setValue("rating", initialData.rating);
  //     setValue("content", initialData.content);
  //   }
  // }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StarRating control={control} />
      <TextInput control={control} />
      <ImageInput control={control} />

      {/* <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "처리 중..." : initialData ? "리뷰 수정하기" : "리뷰 등록하기"}
      </button> */}
      <button type="submit">{initialData ? "리뷰 수정하기" : "리뷰 등록하기"}</button>
    </form>
  );
};

export default ReviewForm;
