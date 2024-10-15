import { tagResponseDto } from "@/api/tag/type";
import { TAG_IMAGES } from "@/constants/tagImages";
import classNames from "classnames/bind";
import React from "react";
import Button from "../Button";
import Image from "../Image";
import styles from "./BadgeList.module.scss";
const cx = classNames.bind(styles);

interface BadgeListProps {
  title: string;
  tags: tagResponseDto[];
  selectedBadges?: tagResponseDto[];
  setSelectedBadges?: React.Dispatch<React.SetStateAction<tagResponseDto[]>>; // Updated type
  onToggle?: (badge: tagResponseDto) => void;
}

const BadgeList: React.FC<BadgeListProps> = ({ title, tags, selectedBadges = [], setSelectedBadges, onToggle }) => {
  const toggleBadge = (badge: tagResponseDto) => {
    if (!setSelectedBadges) {
      return;
    }

    setSelectedBadges((prevSelected) => {
      if (prevSelected.some((prev) => prev.id === badge.id)) {
        return prevSelected.filter((item) => item.id !== badge.id);
      } else {
        return [...prevSelected, badge];
      }
    });
  };

  return (
    <div className={cx("tab-content")}>
      <div className={cx("item-title")}>
        <Image imageInfo={TAG_IMAGES[title as keyof typeof TAG_IMAGES]} />
        <span className={cx("letter")}>{title}</span>
      </div>
      <div className={cx("btn-group")}>
        {tags.map((tag) => (
          <Button
            key={tag.id}
            color="blue"
            variant="badge"
            size="xsmall"
            isSelected={selectedBadges.some((badge) => badge.id === tag.id)}
            onClick={() => {
              if (onToggle) onToggle(tag);
              else toggleBadge(tag);
            }}>
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
