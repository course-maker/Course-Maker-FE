import React from "react";
import Badge from "@/components/commons/Badge/Badge";
import classNames from "classnames/bind";
import styles from "./RegisterBadgeList.module.scss";

const cx = classNames.bind(styles);

interface BadgeListProps {
  title: string;
  badges: string[];
  selectedBadges: string[];
  toggleBadge: (badge: string) => void;
}

const RegisterBadgeList: React.FC<BadgeListProps> = ({ title, badges, selectedBadges, toggleBadge }) => (
  <div className={cx("tab-content")}>
    <div className={cx("title-box")}>
      <span className={cx("item-title")}>{title}</span>
    </div>
    <div className={cx("badges-box")}>
      {badges.map((badge) => (
        <Badge
          key={badge}
          color="gray"
          variant="primary"
          size="xsmall"
          badgeStyle={selectedBadges.includes(badge) ? "selected" : "default"}
          onClick={() => toggleBadge(badge)}>
          {badge}
        </Badge>
      ))}
    </div>
  </div>
);

export default RegisterBadgeList;
