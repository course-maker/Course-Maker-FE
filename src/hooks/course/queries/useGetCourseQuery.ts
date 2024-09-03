import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@/api/course";

export function useGetCourseQuery(param: string) {
  const { data: courseData, isLoading: isCourseLoading } = useQuery({
    queryKey: ["course", param],
    queryFn: () => getCourse(param),
    enabled: !!param,
  });

  return { courseData, isCourseLoading };
}
