import { FilterType } from "@/type/type";
import { useState } from "react";
import FilterButtons from "./FilterButtons";
import ReviewForm from "./ReviewForm";
import StarScore from "./StarScore";

const Review = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("date");

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <StarScore score={4.2} />
      <FilterButtons selectedFilter={selectedFilter} onClick={handleFilterClick} />
      <ReviewForm />
    </>
  );
};
export default Review;
