import { CourseReview } from "@/api/course/type";
import { FilterType } from "@/type/type";
import classNames from "classnames/bind";
import FilterButtons from "./FilterButtons";
import styles from "./Review.module.scss";
import ReviewCardList from "./ReviewCardList";
import ReviewForm from "./ReviewForm";
import StarScore from "./StarScore";

const cx = classNames.bind(styles);

interface ReviewProps {
  selectedFilter: FilterType;
  onFilterClick: (filter: FilterType) => void;
  allReviews: CourseReview[];
  averageRating: number;
}

const Review = ({ selectedFilter, onFilterClick, allReviews, averageRating }: ReviewProps) => {
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
        <ReviewCardList allReviews={allReviews} />
      </article>
    </div>
  );
};
export default Review;
