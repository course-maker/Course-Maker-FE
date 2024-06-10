import React from "react";
import classNames from "classnames/bind";
import styles from "./TabNavigation.module.scss";

const cx = classNames.bind(styles);

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => (
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
);

export default TabNavigation;
