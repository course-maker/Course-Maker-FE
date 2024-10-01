import { useCallback, useEffect, useRef } from "react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import Card2 from "@/components/commons/Card/Card2";

import { useGetInfiniteCourseQuery } from "@/hooks/course/queries/useGetInfiniteCourseQuery";
import { useGetDestinationQuery } from "@/hooks/destination/queries/useGetDestinationQuery";
import { getDestinationResponseDto, GetDestinationsResponseDto } from "@/api/destination/type";
import { Course, Courses } from "@/api/course/type";
import { tagResponseDto } from "@/api/tag/type";

import styles from "./TabCardList.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface props {
  activeTab: string;
  selectedBadges: tagResponseDto[];
}
const TabCardList = ({ activeTab, selectedBadges }: props) => {
  const isCourseTab = activeTab === "코스 찾기";

  // 목적지 쿼리
  const {
    data: destinationData,
    hasNextPage: hasNextDestinationPage,
    isFetchingNextPage: isFetchingNextDestinationPage,
    fetchNextPage: fetchNextDestinationPage,
    isLoading: isDestinationLoading,
  }: UseInfiniteQueryResult<InfiniteData<GetDestinationsResponseDto, unknown>, Error> = useGetDestinationQuery(
    selectedBadges,
  );

  // 코스 쿼리
  const {
    data: courseData,
    hasNextPage: hasNextCoursePage,
    isFetchingNextPage: isFetchingNextCoursePage,
    fetchNextPage: fetchNextCoursePage,
    isLoading: isCourseLoading,
  }: UseInfiniteQueryResult<InfiniteData<Courses, unknown>, Error> = useGetInfiniteCourseQuery(selectedBadges);

  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        if (isCourseTab && hasNextCoursePage && !isFetchingNextCoursePage) {
          fetchNextCoursePage();
        } else if (!isCourseTab && hasNextDestinationPage && !isFetchingNextDestinationPage) {
          fetchNextDestinationPage();
        }
      }
    },
    [
      fetchNextCoursePage,
      hasNextCoursePage,
      isFetchingNextCoursePage,
      fetchNextDestinationPage,
      hasNextDestinationPage,
      isFetchingNextDestinationPage,
      isCourseTab,
    ],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerElem.current) observer.observe(observerElem.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allDestinationData: getDestinationResponseDto[] = destinationData?.pages.flatMap((page) => page.contents) ?? [];
  const allCourseData: Course[] = courseData?.pages.flatMap((page) => page.contents) ?? [];
  console.log(observerElem);
  return (
    <>
      <div className={cx("card_container")}>
        {isCourseLoading || isDestinationLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <Card2 key={index} name={activeTab} loading={true} item={null} />
          ))
        ) : (
          <>
            {(isCourseTab ? allCourseData : allDestinationData).map((item) => (
              <Card2 key={item.id} name={activeTab} item={item} loading={false} />
            ))}
            <div ref={observerElem} style={{ height: "1px" }} />
          </>
        )}
      </div>
    </>
  );
};

export default TabCardList;
