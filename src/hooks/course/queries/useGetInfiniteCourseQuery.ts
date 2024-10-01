import { useInfiniteQuery } from "@tanstack/react-query";
import { getCourse } from "@/api/course";
import { tagResponseDto } from "@/api/tag/type";

export function useGetInfiniteCourseQuery(tags: tagResponseDto[], enabled: boolean = true) {
  const sortOrder = "POPULAR";
  const tagIds = tags.map((tag) => `&tagIds=${tag.id}`).join("");

  const courseInfiniteQuery = useInfiniteQuery({
    queryKey: ["courses", tags],
    queryFn: ({ pageParam = 1 }) => {
      const param = `record=8&page=${pageParam}&orderBy=${sortOrder}${tagIds}`;
      return getCourse(param);
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

  return courseInfiniteQuery;
}
