import { useQuery } from "@tanstack/react-query";
import { getDestinations } from "@/api/destination";
import { tagResponseDto } from "@/api/tag/type";
export function useGetDestinationQuery(page: number, tags: tagResponseDto[]) {
  const sortOrder = "POPULAR";
  const tagIds = tags.map((tag) => `&tagIds=${tag.id}`).join("");
  const param = `record=8&page=${page}&orderBy=${sortOrder}${tagIds}`;

  const { data: destinationData, isLoading: isDestinationLoading } = useQuery({
    queryKey: ["destinations", page, tags],
    queryFn: () => getDestinations(param),
    enabled: !!page && !!tags,
  });

  return { destinationData, isDestinationLoading };
}
