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
  forSearch?: boolean;
  selectedBadges?: tagResponseDto[];
  setSelectedBadges?: React.Dispatch<React.SetStateAction<tagResponseDto[]>>; // Updated type
}

const BadgeList: React.FC<BadgeListProps> = ({
  title,
  tags,
  forSearch = true,
  selectedBadges = [],
  setSelectedBadges,
}) => {
  const toggleBadge = (badge: tagResponseDto) => {
    if (!setSelectedBadges) return;

    setSelectedBadges((prevSelected) => {
      if (prevSelected.includes(badge)) {
        return prevSelected.filter((item) => item !== badge);
      } else if (prevSelected.length < 5 || forSearch) {
        return [...prevSelected, badge];
      } else {
        return prevSelected;
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
            isSelected={selectedBadges.includes(tag) ? true : false} // Corrected argument type
            onClick={() => toggleBadge(tag)}>
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
