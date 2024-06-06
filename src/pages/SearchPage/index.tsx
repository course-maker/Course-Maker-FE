import { useState, useEffect } from "react";
import styles from "./SearchPage.module.scss";
import axios from "axios";
import classNames from "classnames/bind";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card from "@/components/commons/Card/Card";
// import data from "./data.json";
// import listData from "./listData.json";

interface Tag {
  id: number;
  name: string;
  description: string;
}

interface Icons {
  [key: string]: number;
}

interface MockData {
  id: number;
  title: string;
  location: string;
  icons: Icons;
}

const cx = classNames.bind(styles);
// const courseData = data.courseData;
// const destinationData = data.destinationData;
// const lists: MockData[] = listData;

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
        const response = await axios.get("http://34.64.85.245/v1/destination?record=12&page=1");
        setLists(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://34.64.85.245/v1/tags");
        setTagsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const groupTagsByDescription = (tags: Tag[]) => {
    return tags.reduce(
      (acc, tag) => {
        if (!acc[tag.description]) {
          acc[tag.description] = [];
        }
        acc[tag.description].push(tag);
        return acc;
      },
      {} as Record<string, Tag[]>,
    );
  };

  const groupedTags = groupTagsByDescription(tagsData);

  return (
    <div className={cx("search-page")}>
      <div className={cx("desktop-tab")}>
        <div className={cx("tab-nav")}>
          <button
            className={cx("tab-button", { active: activeTab === "코스 찾기" })}
            onClick={() => setActiveTab("코스 찾기")}>
            코스 찾기
          </button>
          <button
            className={cx("tab-button", { active: activeTab === "여행지 찾기" })}
            onClick={() => setActiveTab("여행지 찾기")}>
            여행지 찾기
          </button>
        </div>
      </div>

      {activeTab === "코스 찾기" ? (
        <Section title="" className={cx("tab-container")}>
          {Object.entries(groupedTags).map(([description, tags]) => (
            <BadgeList
              key={description}
              title={description}
              tags={tags}
              selectedBadges={selectedCourseBadges}
              toggleBadge={toggleCourseBadge}
            />
          ))}
        </Section>
      ) : (
        <Section title="" className={cx("tab-container")}>
          {Object.entries(groupedTags).map(([description, tags]) => (
            <BadgeList
              key={description}
              title={description}
              tags={tags}
              selectedBadges={selectedDestinationBadges}
              toggleBadge={toggleDestinationBadge}
            />
          ))}
        </Section>
      )}

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
            ? Array.from({ length: 12 }).map((_, index) => <Card key={index} loading={true} />)
            : lists.map((item) => <Card key={item.id} item={item} loading={false} />)}
        </div>
      </Section>
    </div>
  );
};
export default SearchPage;
