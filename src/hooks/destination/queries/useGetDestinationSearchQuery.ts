import { useQuery } from "@tanstack/react-query";
import { searchDestination } from "@/api/destination";

export function useGetDestinationSearchQuery(page: number = 1, title: string) {
  const param = `title=${title}&record=10&page=${page}`;

  const { data: destinationSearchData, isLoading: isDestinationSearchLoading } = useQuery({
    queryKey: ["searchDestination", page, title],
    queryFn: () => searchDestination(param),
    enabled: !!page && !!title,
  });

  return { destinationSearchData, isDestinationSearchLoading };
}
