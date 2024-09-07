import { useState } from "react";
// import { useLocation } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

// 사용되지 않는 import 주석 처리
// import Card2 from "@/components/commons/Card/Card2";
// import { useGetCourseQuery } from "@/hooks/course/queries/useGetCourseQuery";
// import { getTag } from "@/api/tag";
// import { tagResponseDto } from "@/api/tag/type";
// import { getDestinations } from "@/api/destination";
// import { Destination } from "@/api/destination/type";
// import { getCourse } from "@/api/course";
// import { Courses } from "@/api/course/type";
// import { initialDestination, initialCourse, initialSortOrder, initialPage } from "@/constants/initialValues";
// import BadgeList from "@/components/commons/BadgeList/BadgeList";

import SearchBadgeLists from "@/components/commons/BadgeLists/SearchBadgeLists";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";
import Section from "@/components/commons/Section/Section";
import SearchBar from "@/components/commons/SearchBar";

import { useBadgeListViewModel } from "@/hooks/business/useBadgeListViewModel";
// import groupTags from "@/utils/groupTags";

const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("여행지 찾기");
  const { isTagLoading } = useBadgeListViewModel();
  // const { isLoading, courseData } = useGetCourseQuery("record=4&page=1&orderBy=POPULAR");
  // const location = useLocation(); // useLocation 사용 누락된 변수 추가
  // const { propsTagName } = location.state || {};

  console.log(activeTab);
  console.log(isTagLoading);

  return (
    <div className={cx("search-page")}>
      <Section title="" className={cx("container")}>
        <SearchBar color="gray" />
      </Section>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section className={cx("tab-container")}>
        <SearchBadgeLists activeTab={activeTab} />;
      </Section>
    </div>
  );
};

export default SearchPage;
