import { getDestinationApi, getDestinationReviews } from "@/api/destination";
import { authState } from "@/recoil/authAtom";
import { FilterType } from "@/type/type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Review from "../../Review";

const DestinationReview = () => {
  const { id } = useParams();
  const postId = Number(id);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("NEWEST");
  const [isAuth] = useRecoilState(authState);

  const fetchDestinationDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getDestinationApi(Number(id), options);
  };

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", postId],
    queryFn: fetchDestinationDetail,
    retry: 0,
  });

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const reviewInfiniteQuery = useInfiniteQuery({
    queryKey: ["destinationReview", postId, selectedFilter],
    queryFn: ({ pageParam = 1 }) =>
      getDestinationReviews({ destinationId: postId, record: 5, orderBy: selectedFilter, page: pageParam }),
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

  const averageRating = destinationDetailData?.averageRating || 0;

  return (
    <>
      <Review
        type={"destination"}
        selectedFilter={selectedFilter}
        onFilterClick={handleFilterClick}
        averageRating={averageRating}
        reviewInfiniteQuery={reviewInfiniteQuery}
      />
    </>
  );
};
export default DestinationReview;
