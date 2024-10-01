import { useInfiniteQuery } from "@tanstack/react-query";
import { getDestinations } from "@/api/destination";
import { tagResponseDto } from "@/api/tag/type";

export function useGetDestinationQuery(tags: tagResponseDto[], sortOrder: string = "VIEWS", enabled: boolean = true) {
  const tagIds = tags.map((tag) => `&tagIds=${tag.id}`).join("");

  const destinationInfiniteQuery = useInfiniteQuery({
    queryKey: ["destinations", tags, sortOrder],
    queryFn: ({ pageParam = 1 }) => {
      const param = `record=8&page=${pageParam}&orderBy=${sortOrder}${tagIds}`;
      return getDestinations(param);
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
    enabled,
  });

  return destinationInfiniteQuery;
}
