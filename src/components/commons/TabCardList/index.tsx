import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useState } from "react";
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
  const [sortOrder, setSortOrder] = useState({
    course: "VIEWS",
    destination: "VIEWS",
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder((prev) => ({
      ...prev,
      [activeTab === "코스 찾기" ? "course" : "destination"]: newSortOrder,
    }));
  };
  // 목적지 쿼리
  const {
    data: destinationData,
    hasNextPage: hasNextDestinationPage,
    isFetchingNextPage: isFetchingNextDestinationPage,
    fetchNextPage: fetchNextDestinationPage,
    isLoading: isDestinationLoading,
  }: UseInfiniteQueryResult<InfiniteData<GetDestinationsResponseDto, unknown>, Error> = useGetDestinationQuery(
    selectedBadges,
    sortOrder.destination,
    !isCourseTab,
  );

  // 코스 쿼리
  const {
    data: courseData,
    hasNextPage: hasNextCoursePage,
    isFetchingNextPage: isFetchingNextCoursePage,
    fetchNextPage: fetchNextCoursePage,
    isLoading: isCourseLoading,
  }: UseInfiniteQueryResult<InfiniteData<Courses, unknown>, Error> = useGetInfiniteCourseQuery(
    selectedBadges,
    sortOrder.course,
    isCourseTab,
  );

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
      {isCourseLoading || isDestinationLoading ? (
        <div className={cx("card_container")}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Card2 key={index} name={activeTab} loading={true} item={null} isCourseTab={isCourseTab} />
          ))}
        </div>
      ) : (
        <>
          <div className={cx("option-container")}>
            <span>
              전체 {isCourseTab ? courseData?.pages[0]?.totalContents : destinationData?.pages[0]?.totalContents}개
            </span>
            <div>
              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className={cx("select-box")}
                onChange={handleSortChange}
                value={sortOrder[activeTab === "코스 찾기" ? "course" : "destination"]}>
                <option value="NEWEST">최신순</option>
                <option value="POPULAR">인기순</option>
                <option value="VIEWS">조회수순</option>
                <option value="RATING">별점순</option>
              </select>
            </div>
          </div>
          <div className={cx("card_container")}>
            {(isCourseTab ? allCourseData : allDestinationData).map((item) => (
              <Card2
                key={item.id}
                name={activeTab}
                item={item}
                loading={isCourseTab ? isCourseLoading : isDestinationLoading}
                isCourseTab={isCourseTab}
              />
            ))}
            <div ref={isCourseTab ? coursesElem : destinationsElem} style={{ height: "1px" }} />
          </div>
        </>
      )}
    </>
  );
};

export default TabCardList;
