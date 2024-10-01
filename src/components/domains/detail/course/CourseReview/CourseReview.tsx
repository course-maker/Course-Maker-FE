import { getCourseDetail, getCourseReviews } from "@/api/course";
import { authState } from "@/recoil/authAtom";
import { FilterType } from "@/type/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Review from "../../Review";

const CourseReview = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("NEWEST");
  const [isAuth] = useRecoilState(authState);

  const fetchCourseDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getCourseDetail(Number(id), options);
  };

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: fetchCourseDetail,
  });

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const reviewInfiniteQuery = useInfiniteQuery({
    queryKey: ["courseReview", postId, selectedFilter],
    queryFn: ({ pageParam = 1 }) =>
      getCourseReviews({ courseId: postId, record: 5, orderBy: selectedFilter, page: pageParam }),
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

  const averageRating = courseDetailData?.averageRating || 0;

  return (
    <>
      <Review
        type={"course"}
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        averageRating={averageRating}
        reviewInfiniteQuery={reviewInfiniteQuery}
      />
    </>
  );
};
export default CourseReview;
