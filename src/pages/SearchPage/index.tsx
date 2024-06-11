import { useState, useEffect } from "react";

import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card from "@/components/commons/Card/Card";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";

import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import { getDestination } from "@/api/destination";
import { Destination } from "@/api/destination/type";
import { getCourse } from "@/api/course";
import { Courses } from "@/api/course/type";

import groupTags from "@/utils/groupTags";

const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("코스 찾기");
  const [selectedCourseBadges, setSelectedCourseBadges] = useState<string[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<string[]>([]);
  const [lists, setLists] = useState<Destination[]>([]);
  const [course, setCourse] = useState<Courses[]>([]);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleCourseBadge = (badge: string) => {
    setSelectedCourseBadges((prevSelected) =>
      prevSelected.includes(badge) ? prevSelected.filter((item) => item !== badge) : [...prevSelected, badge],
    );
  };

  const toggleDestinationBadge = (badge: string) => {
    setSelectedDestinationBadges((prevSelected) =>
      prevSelected.includes(badge) ? prevSelected.filter((item) => item !== badge) : [...prevSelected, badge],
    );
  };

  // 여행지 정보
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await getDestination("record=20&page=1&orderBy=NEWEST");
        setLists(response.contents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  // 코스 정보
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await getCourse("?record=20&page=1&orderBy=NEWEST");
        setCourse(response.contents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  // 태그 정보
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await getTag();
        setTagsData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const groupedTags = groupTags(tagsData);

  return (
    <div className={cx("search-page")}>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section title="" className={cx("tab-container")}>
        {Object.entries(groupedTags).map(([description, tags]) => (
          <BadgeList
            key={description}
            title={description}
            tags={tags}
            selectedBadges={activeTab === "코스 찾기" ? selectedCourseBadges : selectedDestinationBadges}
            toggleBadge={activeTab === "코스 찾기" ? toggleCourseBadge : toggleDestinationBadge}
          />
        ))}
      </Section>

      <div className={cx("option-container")}>
        <span>전체 {activeTab === "코스 찾기" ? course.length : lists.length}개</span>
        <div>
          <select name="HeadlineAct" id="HeadlineAct" className={cx("select-box")}>
            <option value="0">최신순</option>
            <option value="1">인기순</option>
            <option value="2">조회수순</option>
            <option value="3">별점순</option>
          </select>
        </div>
      </div>

      <Section title="">
        <div className={cx("card_container")}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => <Card key={index} loading={true} item={null} />)
            : (activeTab === "코스 찾기" ? course : lists).map((item) => (
                <Card key={item.id} name={activeTab} item={item} loading={false} />
              ))}
        </div>
      </Section>
    </div>
  );
};

export default SearchPage;
