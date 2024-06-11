import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card from "@/components/commons/Card/Card";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";

import { getTag, Tag } from "@/api/tag";
import groupTags from "@/utils/groupTags";

interface Icons {
  [key: string]: number;
}

interface MockData {
  id: number;
  title: string;
  location: {
    address: string;
    longitude: number;
    latitude: number;
  };
  icons: Icons;
  pictureLink: string;
  content: string;
  tags: Tag[];
}

const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("코스 찾기");
  const [selectedCourseBadges, setSelectedCourseBadges] = useState<string[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<string[]>([]);
  const [lists, setLists] = useState<MockData[]>([]);
  const [tagsData, setTagsData] = useState<Tag[]>([]);
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

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://34.64.85.245/v1/destination?tagIds=6&record=20&page=1&orderBy=NEWEST");
        setLists(response.data.contents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  // 태그 Data
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
        <span>전체 {lists.length}개</span>
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
            : lists.map((item) => <Card key={item.id} item={item} loading={false} />)}
        </div>
      </Section>
    </div>
  );
};

export default SearchPage;
