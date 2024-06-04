import { useState } from "react";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card from "@/components/commons/Card/Card";
import data from "./data.json";
import listData from "./listData.json";

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
const courseData = data.courseData;
const destinationData = data.destinationData;
const lists: MockData[] = listData;

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("코스 찾기");
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prevSelected) =>
      prevSelected.includes(badge) ? prevSelected.filter((item) => item !== badge) : [...prevSelected, badge],
    );
  };

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
          {Object.entries(courseData).map(([title, badges]) => (
            <BadgeList
              key={title}
              title={title}
              badges={badges}
              selectedBadges={selectedBadges}
              toggleBadge={toggleBadge}
            />
          ))}
        </Section>
      ) : (
        <Section title="" className={cx("tab-container")}>
          {Object.entries(destinationData).map(([title, badges]) => (
            <BadgeList
              key={title}
              title={title}
              badges={badges}
              selectedBadges={selectedBadges}
              toggleBadge={toggleBadge}
            />
          ))}
        </Section>
      )}

      <div className={cx("option-container")}>
        <span>전체 {"1개"}</span>
        <div>
          <select name="HeadlineAct" id="HeadlineAct" className={cx("select-box")}>
            <option value="">최신순</option>
            <option value="JM">인기순</option>
            <option value="SRV">조회수순</option>
            <option value="JH">별점순</option>
          </select>
        </div>
      </div>

      <Section title="">
        <div className={cx("card_container")}>
          {lists.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default SearchPage;
