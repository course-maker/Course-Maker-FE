import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import Card2 from "@/components/commons/Card/Card2";

import { useGetInfiniteCourseQuery } from "@/hooks/course/queries/useGetInfiniteCourseQuery";
import { useGetDestinationQuery } from "@/hooks/destination/queries/useGetDestinationQuery";
import { getDestinationResponseDto, GetDestinationsResponseDto } from "@/api/destination/type";
import { useInfiniteScroll } from "@/utils/useInfiniteScroll";
import { Course, Courses } from "@/api/course/type";
import { tagResponseDto } from "@/api/tag/type";

import styles from "./TabCardList.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface props {
  activeTab: string;
  isCourseTab?: boolean;
  selectedBadges: tagResponseDto[];
}
const TabCardList = ({ activeTab, isCourseTab, selectedBadges }: props) => {
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

  const { data: destinations, observerElem: destinationsElem } = useInfiniteScroll({
    data: destinationData,
    hasNextPage: hasNextDestinationPage,
    isFetchingNextPage: isFetchingNextDestinationPage,
    fetchNextPage: fetchNextDestinationPage,
  });

  const { data: courses, observerElem: coursesElem } = useInfiniteScroll({
    data: courseData,
    hasNextPage: hasNextCoursePage,
    isFetchingNextPage: isFetchingNextCoursePage,
    fetchNextPage: fetchNextCoursePage,
  });

  const allDestinationData: getDestinationResponseDto[] = destinations?.pages.flatMap((page) => page.contents) ?? [];
  const allCourseData: Course[] = courses?.pages.flatMap((page) => page.contents) ?? [];

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
            <div ref={isCourseTab ? coursesElem : destinationsElem} style={{ height: "1px" }} />
          </>
        )}
      </div>
    </>
  );
};

export default TabCardList;
