import { postCourseReviews, putCourseReviewEdit } from "@/api/course";
import { postDestinationReviews, putDestinationReviewEdit } from "@/api/destination";
import Button from "@/components/commons/Button";
import useAuth from "@/hooks/useAuth";
import { useHandleImageUpload } from "@/hooks/useFormImageUpload";
import { ReviewEditForm, ReviewFormType } from "@/type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ImageInput from "./ImageInput";
import styles from "./ReviewForm.module.scss";
import StarRating from "./StarRating";
import TextInput from "./TextInput";

const cx = classNames.bind(styles);

interface ReviewFormProps {
  type: "course" | "destination";
  initialData?: ReviewEditForm | null;
  setEditingReview: React.Dispatch<React.SetStateAction<ReviewEditForm | null>>;
}

const ReviewForm = ({ type, initialData, setEditingReview }: ReviewFormProps) => {
  const { isAuth } = useAuth();
  const { id } = useParams();
  const postId = Number(id);
  const { handleImageUpload } = useHandleImageUpload();
  const { handleSubmit, control, reset } = useForm<ReviewFormType>({
    defaultValues: initialData?.initialValue || {
      title: "temp",
      description: "",
      pictures: [],
      rating: 0,
    },
  });

  const queryClient = useQueryClient();

  const postReviewMutation = useMutation({
    mutationFn: (formData: FieldValues) => {
      if (initialData) {
        return type === "course"
          ? putCourseReviewEdit(initialData?.reviewId, formData)
          : putDestinationReviewEdit(initialData.reviewId, formData);
      } else {
        return type === "course"
          ? postCourseReviews({ courseId: postId }, formData)
          : postDestinationReviews({ destinationId: postId }, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: type === "course" ? ["courseReview", postId] : ["destinationReview", postId],
      });
      queryClient.invalidateQueries({
        queryKey: type === "course" ? ["courseDetailData"] : ["destinationDetailData"],
      });
      // initialData ? alert("리뷰가 성공적으로 수정 되었습니다!") : alert("리뷰가 성공적으로 등록 되었습니다!");
      reset({
        title: "temp",
        description: "",
        pictures: [],
        rating: 0,
      });
      setEditingReview(null);
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 409:
          alert("해당 코스에 이미 리뷰를 남겼습니다.");
          break;
        default:
          alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (initialData) {
      const updatedPictures = await Promise.all(
        (data.pictures as (File | string)[]).map(async (item: File | string) => {
          if (item instanceof File) {
            return await handleImageUpload(item);
          } else {
            return item;
          }
        }),
      );
      data.pictures = updatedPictures;
    } else {
      if (data.pictures && data.pictures.length > 0) {
        data.pictures = await handleImageUpload(data.pictures);
      }
    }

    postReviewMutation.mutate(data);
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData.initialValue);
    }
  }, [initialData, reset]);

  return (
    <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <StarRating control={control} isDisabled={!isAuth} />
      </div>
      <div className={cx("text-input")}>
        <TextInput control={control} isDisabled={!isAuth} />
      </div>
      <div className={cx("images-submit")}>
        <ImageInput control={control} />
        <div className={cx("images-submit-btn")}>
          <Button
            type="submit"
            size="small"
            color="blue"
            variant="primary"
            isSquare={true}
            isDisabled={!isAuth || postReviewMutation.isPending}>
            {postReviewMutation.isPending ? "등록중" : initialData ? "리뷰 수정하기" : "리뷰 등록하기"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
