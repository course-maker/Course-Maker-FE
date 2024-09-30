import { useQuery } from "@tanstack/react-query";
import { searchCourse } from "@/api/course";

export function useGetCourseSearchQuery(page: number = 1, title: string) {
  const param = `title=${title}&record=10&page=${page}`;

  const { data: courseSearchData, isLoading: isCourseSearchLoading } = useQuery({
    queryKey: ["searchCourse", page, title],
    queryFn: () => searchCourse(param),
    enabled: !!page && !!title,
  });

  return { courseSearchData, isCourseSearchLoading };
}
