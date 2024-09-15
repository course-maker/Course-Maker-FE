import { CourseReview } from "@/api/course/type";
import ReviewCard from "./ReviewCard";

interface ReviewCardListProps {
  type: "course" | "destination";
  allReviews: CourseReview[];
}

const ReviewCardList = ({ type, allReviews }: ReviewCardListProps) => {
  return (
    <>
      {allReviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewCard type={type} review={review} />
        </div>
      ))}
    </>
  );
};
export default ReviewCardList;
