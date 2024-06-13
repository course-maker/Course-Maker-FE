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
import { initialDestination, initialCourse } from "@/constants/initialValues";

const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("코스 찾기");
  const [selectedCourseBadges, setSelectedCourseBadges] = useState<string[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<string[]>([]);
  const [lists, setLists] = useState<Destination>(initialDestination);
  const [course, setCourse] = useState<Courses>(initialCourse);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedTagsInfo = (params) => {
    if (tagsData.length > 0 && params.length > 0) {
      const tagIds = tagsData
        .filter((tag) => params.includes(tag.name))
        .map((tag) => tag.id)
        .map((id) => `tagIds=${id}`)
        .join("&");
      return tagIds ? `&${tagIds}` : "";
    }
    return "";
  };

  // 여행지 정보
  useEffect(() => {
    const tags = selectedTagsInfo(selectedDestinationBadges);
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await getDestination(`record=12&page=1&orderBy=NEWEST${tags}`);
        setLists(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [selectedDestinationBadges]);

  // 코스 정보
  useEffect(() => {
    const tags = selectedTagsInfo(selectedCourseBadges);
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await getCourse(`record=12&page=1&orderBy=NEWEST${tags}`);
        setCourse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [selectedCourseBadges]);

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
  console.log(groupedTags);

  return (
    <div className={cx("search-page")}>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section title="" className={cx("tab-container")}>
        {Object.entries(groupedTags).map(([description, tags]) => (
          <BadgeList
            key={description}
            title={description}
            tags={tags}
            activeTab={activeTab}
            selectedBadges={activeTab === "코스 찾기" ? selectedCourseBadges : selectedDestinationBadges}
            setSelectedBadges={activeTab === "코스 찾기" ? setSelectedCourseBadges : setSelectedDestinationBadges}
          />
        ))}
      </Section>

      <div className={cx("option-container")}>
        <span>전체 {activeTab === "코스 찾기" ? course?.contents?.length : lists?.contents?.length}개</span>
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
            ? Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} name={activeTab} loading={true} item={null} />
              ))
            : (activeTab === "코스 찾기" ? course.contents : lists.contents)?.map((item) => (
                <Card key={item.id} name={activeTab} item={item} loading={false} />
              ))}
        </div>
      </Section>
    </div>
  );
};

export default SearchPage;
