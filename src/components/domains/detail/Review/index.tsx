import { FilterType } from "@/type/type";
import classNames from "classnames/bind";
import { useState } from "react";
import FilterButtons from "./FilterButtons";
import styles from "./Review.module.scss";
import ReviewCardList from "./ReviewCardList";
import ReviewForm from "./ReviewForm";
import StarScore from "./StarScore";

const cx = classNames.bind(styles);

const Review = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("date");

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <StarScore score={4.2} />
        <FilterButtons selectedFilter={selectedFilter} onClick={handleFilterClick} />
      </header>
      <div className={cx("form")}>
        <h2 className={cx("form-title")}>리뷰 작성하기</h2>
        <ReviewForm />
      </div>
      <article className={cx("review")}>
        <ReviewCardList />
      </article>
    </div>
  );
};
export default Review;
