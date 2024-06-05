import React from "react";
import Badge from "@/components/commons/Badge/Badge";
import classNames from "classnames/bind";
import styles from "./BadgeList.module.scss";

const cx = classNames.bind(styles);

interface Tag {
  id: number;
  name: string;
  description: string;
}

interface BadgeListProps {
  title: string;
  tags: Tag[];
  selectedBadges: string[];
  toggleBadge: (badge: string) => void;
}

const BadgeList: React.FC<BadgeListProps> = ({ title, tags, selectedBadges, toggleBadge }) => (
  <div className={cx("tab-content")}>
    <span className={cx("item-title")}>{title}</span>
    {tags.map((tag) => (
      <Badge
        key={tag.id}
        color="gray"
        variant="primary"
        size="xsmall"
        badgeStyle={selectedBadges.includes(tag.name) ? "selected" : "default"}
        onClick={() => toggleBadge(tag.name)}>
        {tag.name}
      </Badge>
    ))}
  </div>
);

export default BadgeList;
