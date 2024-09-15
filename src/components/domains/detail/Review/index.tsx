import { GetCourseReviewsResponseDto } from "@/api/course/type";
import { FilterType } from "@/type/type";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import classNames from "classnames/bind";
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
  reviewInfiniteQuery: UseInfiniteQueryResult<InfiniteData<GetCourseReviewsResponseDto, unknown>, Error>;
}

const Review = ({ type, selectedFilter, onFilterClick, averageRating, reviewInfiniteQuery }: ReviewProps) => {
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <StarScore score={averageRating} />
        <FilterButtons selectedFilter={selectedFilter} onClick={onFilterClick} />
      </header>
      <div className={cx("form")}>
        <h2 className={cx("form-title")}>리뷰 작성하기</h2>
        <ReviewForm />
      </div>
      <article className={cx("review")}>
        <ReviewCardList type={type} reviewInfiniteQuery={reviewInfiniteQuery} />
      </article>
    </div>
  );
};
export default Review;
