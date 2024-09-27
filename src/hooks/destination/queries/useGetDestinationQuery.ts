import { useInfiniteQuery } from "@tanstack/react-query";
import { getDestinations } from "@/api/destination";
import { tagResponseDto } from "@/api/tag/type";
export function useGetDestinationQuery(tags: tagResponseDto[]) {
  const sortOrder = "POPULAR";
  const tagIds = tags.map((tag) => `&tagIds=${tag.id}`).join("");

  const destinationInfiniteQuery = useInfiniteQuery({
    queryKey: ["destinations", tags],
    queryFn: ({ pageParam = 1 }) => {
      const param = `record=8&page=${pageParam}&orderBy=${sortOrder}${tagIds}`;
      return getDestinations(param); // 반드시 return 추가
    },
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

  return destinationInfiniteQuery;
}
