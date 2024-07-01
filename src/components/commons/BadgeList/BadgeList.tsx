import { tagResponseDto } from "@/api/tag/type";
import Badge from "@/components/commons/Badge/Badge";
import classNames from "classnames/bind";
import React from "react";
import styles from "./BadgeList.module.scss";
const cx = classNames.bind(styles);

interface BadgeListProps {
  type?: string;
  title: string;
  tags: tagResponseDto[];
  selectedBadges?: tagResponseDto[];
  setSelectedBadges?: React.Dispatch<React.SetStateAction<tagResponseDto[]>>; // Updated type
}

const BadgeList: React.FC<BadgeListProps> = ({
  type = "destination",
  title,
  tags,
  selectedBadges = [],
  setSelectedBadges,
}) => {
  const toggleBadge = (badge: tagResponseDto) => {
    if (!setSelectedBadges) return;
    setSelectedBadges((prevSelected) =>
      prevSelected.includes(badge) ? prevSelected.filter((item) => item !== badge) : [...prevSelected, badge],
    );
  };

  return (
    <div className={cx("tab-content", type)}>
      <span className={cx("item-title")}>{title}</span>
      <div className={cx("btn-group")}>
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            color="gray"
            variant="primary"
            size="xsmall"
            badgeStyle={selectedBadges.includes(tag) ? "selected" : "default"} // Corrected argument type
            onClick={() => toggleBadge(tag)}>
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
