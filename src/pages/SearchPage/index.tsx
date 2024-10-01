import { useState } from "react";
// import { useLocation } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

import SearchBadgeLists from "@/components/commons/BadgeLists/SearchBadgeLists";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";
import TabCardList from "@/components/commons/TabCardList";
import Section from "@/components/commons/Section/Section";
import SearchBar from "@/components/commons/SearchBar";

import { useGetDestinationSearchQuery } from "@/hooks/destination/queries/useGetDestinationSearchQuery";
import { useGetCourseSearchQuery } from "@/hooks/course/queries/useGetCourseSearchQuery";
import { useBadgeListViewModel } from "@/hooks/business/useBadgeListViewModel";

const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("여행지 찾기");
  const [inputValue, setInputValue] = useState("");
  const { isTagLoading, DestinationBadges, CourseBadges } = useBadgeListViewModel();
  const { destinationSearchData } = useGetDestinationSearchQuery(1, inputValue);
  const { courseSearchData } = useGetCourseSearchQuery(1, inputValue);
  const isCourseTab = activeTab === "코스 찾기";
  console.log(isTagLoading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className={cx("search-page")}>
      <Section title="" className={cx("container")}>
        <SearchBar
          color="gray"
          destination={!isCourseTab ? destinationSearchData?.contents : []}
          course={isCourseTab ? courseSearchData?.contents : []}
          value={inputValue}
          onChange={handleInputChange}
        />
      </Section>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section className={cx("tab-container")}>
        <SearchBadgeLists activeTab={activeTab} />
      </Section>
      <Section>
        <TabCardList
          activeTab={activeTab}
          isCourseTab={isCourseTab}
          selectedBadges={isCourseTab ? (CourseBadges ?? []) : (DestinationBadges ?? [])}
        />
      </Section>
    </div>
  );
};

export default SearchPage;
