import { useState } from "react";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import data from "./data.json";

const cx = classNames.bind(styles);
const courseData = data.courseData;
const destinationData = data.destinationData;

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

      <Section title="" className={cx("tab-container")}>
        {activeTab === "코스 찾기" ? (
          <>
            {Object.entries(courseData).map(([title, badges]) => (
              <BadgeList
                key={title}
                title={title}
                badges={badges}
                selectedBadges={selectedBadges}
                toggleBadge={toggleBadge}
              />
            ))}
          </>
        ) : (
          <>
            {Object.entries(destinationData).map(([title, badges]) => (
              <BadgeList
                key={title}
                title={title}
                badges={badges}
                selectedBadges={selectedBadges}
                toggleBadge={toggleBadge}
              />
            ))}
          </>
        )}
      </Section>
    </div>
  );
};

export default SearchPage;
