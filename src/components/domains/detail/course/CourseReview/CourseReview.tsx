import { getCourseDetail, getCourseReviews } from "@/api/course";
import { FilterType } from "@/type/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../../Review";

const CourseReview = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("NEWEST");

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(postId)),
    retry: 0,
  });

  const { data: reviewData } = useInfiniteQuery({
    queryKey: ["courseReview", postId, selectedFilter],
    queryFn: () => getCourseReviews({ courseId: postId, record: 20, orderBy: selectedFilter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPage) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    retry: 0,
  });

  const allReviews = reviewData?.pages.flatMap((page) => page.contents) ?? [];
  const averageRating = courseDetailData?.averageRating || 0;

  return (
    <>
      <Review
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        allReviews={allReviews}
        averageRating={averageRating}
      />
    </>
  );
};
export default CourseReview;
