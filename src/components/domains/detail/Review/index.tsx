import { deleteCourseReview } from "@/api/course";
import { deleteDestinationReview } from "@/api/destination";
import { FilterType, GetReviewsResponseDto, RefinedReview, ReviewEditForm } from "@/type/type";
import { InfiniteData, UseInfiniteQueryResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import styles from "./Review.module.scss";
import ReviewCardList from "./ReviewCardList";
import ReviewForm from "./ReviewForm";
import StarScore from "./StarScore";

const cx = classNames.bind(styles);

interface ReviewProps {
  type: "course" | "destination";
  selectedFilter: FilterType;
  onFilterClick: (filter: FilterType) => void;
  averageRating: number;
  reviewInfiniteQuery: UseInfiniteQueryResult<InfiniteData<GetReviewsResponseDto, unknown>, Error>;
}

const Review = ({ type, selectedFilter, onFilterClick, averageRating, reviewInfiniteQuery }: ReviewProps) => {
  const { id } = useParams();
  const postId = Number(id);
  const [editingReview, setEditingReview] = useState<ReviewEditForm | null>(null);
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => {
      return type === "course" ? deleteCourseReview(reviewId) : deleteDestinationReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: type === "course" ? ["courseReview", postId] : ["destinationReview", postId],
      });
      queryClient.invalidateQueries({
        queryKey: type === "course" ? ["courseDetailData"] : ["destinationDetailData"],
      });
      setEditingReview(null);
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 404:
          alert("해당하는 리뷰가 없습니다.");
          break;
        default:
          alert("리뷰 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const handleEditClick = (review: RefinedReview) => {
    const { reviewId, description, pictures, rating } = review;
    setEditingReview({ reviewId, initialValue: { description, pictures, rating } });
  };

  const handleDeleteClick = (reviewId: number) => deleteReviewMutation.mutate(reviewId);

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <StarScore score={averageRating} />
        <FilterButtons selectedFilter={selectedFilter} onClick={onFilterClick} />
      </header>
      <div className={cx("form")}>
        <h2 className={cx("form-title")}>리뷰 작성하기</h2>
        <ReviewForm type={type} initialData={editingReview} setEditingReview={setEditingReview} />
      </div>
      <article className={cx("review")}>
        <ReviewCardList
          type={type}
          reviewInfiniteQuery={reviewInfiniteQuery}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </article>
    </div>
  );
};
export default Review;
