import React from "react";
import Badge from "@/components/commons/Badge/Badge";
import classNames from "classnames/bind";
import styles from "./BadgeListTemp.module.scss";

const cx = classNames.bind(styles);

interface Tag {
  id: number;
  name: string;
  description: string;
}

interface BadgeListProps {
  title: string;
  tags: Tag[];
  selectedBadges: Tag[];
  toggleBadge: (badge: Tag) => void;
}

const BadgeListTemp: React.FC<BadgeListProps> = ({ title, tags, selectedBadges, toggleBadge }) => (
  <div className={cx("tab-content")}>
    <span className={cx("item-title")}>{title}</span>
    <div className={cx("btn-group")}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          color="gray"
          variant="primary"
          size="xsmall"
          badgeStyle={selectedBadges.find((selectedTag) => selectedTag.id === tag.id) ? "selected" : "default"}
          onClick={() => toggleBadge(tag)}>
          {tag.name}
        </Badge>
      ))}
    </div>
  </div>
);

export default BadgeListTemp;
