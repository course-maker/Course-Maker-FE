import { useCallback, useEffect, useRef } from "react";
import { InfiniteData } from "@tanstack/react-query";

interface UseInfiniteScrollOptions<T> {
  data: InfiniteData<T, unknown> | undefined;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll<T>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollOptions<T>) {
  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerElem.current) observer.observe(observerElem.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return {
    data,
    observerElem,
  };
}
