import { CourseReview, GetCourseReviewsResponseDto } from "@/api/course/type";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import ReviewCard from "./ReviewCard";

interface ReviewCardListProps {
  type: "course" | "destination";
  reviewInfiniteQuery: UseInfiniteQueryResult<InfiniteData<GetCourseReviewsResponseDto>, Error>;
  onEditClick: (review: CourseReview) => void;
  onDeleteClick: (reviewId: number) => void;
}

const ReviewCardList = ({ type, reviewInfiniteQuery, onEditClick, onDeleteClick }: ReviewCardListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = reviewInfiniteQuery;

  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerElem.current) observer.observe(observerElem.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allReviews = data?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <>
      {allReviews.map((review) => (
        <div key={review.reviewId}>
          <ReviewCard type={type} review={review} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </div>
      ))}
      <div ref={observerElem} style={{ height: "1px" }} />
    </>
  );
};

export default ReviewCardList;
