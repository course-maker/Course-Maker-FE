import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import groupTags from "@/utils/groupTags";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./BadgeLists.module.scss";

const cx = classNames.bind(styles);

interface BadgeListProps {
  selectedBadges: tagResponseDto[];
  onChange: (updatedDestinationBadges: tagResponseDto[]) => void;
}

const BadgeLists = ({ selectedBadges, onChange }: BadgeListProps) => {
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);

  const handleBadgeToggle = (badge: tagResponseDto) => {
    if (selectedBadges.some((item) => item.id === badge.id)) {
      onChange(selectedBadges.filter((item) => item.id !== badge.id));
    } else if (selectedBadges.length < 5) {
      onChange([...selectedBadges, badge]);
    } else return;
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getTag();
        setTagsData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLists();
  }, []);

  const groupedTags = groupTags(tagsData);
  return (
    <div className={cx("container")}>
      {Object.entries(groupedTags).map(([description, tags]) => (
        <BadgeList
          key={description}
          title={description}
          tags={tags}
          selectedBadges={selectedBadges}
          onToggle={handleBadgeToggle}
        />
      ))}
    </div>
  );
};

export default BadgeLists;
