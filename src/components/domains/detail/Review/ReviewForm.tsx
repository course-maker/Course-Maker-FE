import Button from "@/components/commons/Button";
import { useHandleImageUpload } from "@/hooks/useFormImageUpload";
import { ReviewFormType } from "@/type/type";
import classNames from "classnames/bind";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageInput from "./ImageInput";
import styles from "./ReviewForm.module.scss";
import StarRating from "./StarRating";
import TextInput from "./TextInput";

const cx = classNames.bind(styles);

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
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <StarRating control={control} />
      </div>
      <div className={cx("text-input")}>
        <TextInput control={control} />
      </div>
      <div className={cx("images-submit")}>
        <ImageInput control={control} />
        <Button type="submit" size="small" color="blue" variant="primary" isSquare={true}>
          {initialData ? "리뷰 수정하기" : "리뷰 등록하기"}
        </Button>
      </div>
      {/* <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "처리 중..." : initialData ? "리뷰 수정하기" : "리뷰 등록하기"}
      </button> */}
    </form>
  );
};

export default ReviewForm;
