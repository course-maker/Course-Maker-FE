import { CourseReview } from "@/api/course/type";
import ReviewCard from "./ReviewCard";

interface ReviewCardListProps {
  allReviews: CourseReview[];
}

const ReviewCardList = ({ allReviews }: ReviewCardListProps) => {
  return (
    <>
      {allReviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewCard review={review} />
        </div>
      ))}
    </>
  );
};
export default ReviewCardList;
