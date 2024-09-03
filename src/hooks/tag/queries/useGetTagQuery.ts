import { useQuery } from "@tanstack/react-query";
import { getTag } from "@/api/tag";

export function useGetTagQuery() {
  const { data: tagData, isLoading: isTagLoading } = useQuery({
    queryKey: ["tag"],
    queryFn: () => getTag(),
  });

  return { tagData, isTagLoading };
}
