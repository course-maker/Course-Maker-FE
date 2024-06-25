import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import groupTags from "@/utils/groupTags";
import { useEffect, useState } from "react";

interface BadgeListProps {
  type?: string;
  selectedBadges: tagResponseDto[];
  onChange: (updatedDestinationBadges: tagResponseDto[]) => void;
}

const BadgeLists = ({ type, selectedBadges, onChange }: BadgeListProps) => {
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<tagResponseDto[]>(selectedBadges);

  useEffect(() => {
    onChange(selectedDestinationBadges);
  }, [selectedDestinationBadges, onChange]);

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
    <>
      {Object.entries(groupedTags).map(([description, tags]) => (
        <BadgeList
          key={description}
          type={type}
          title={description}
          tags={tags}
          selectedBadges={selectedDestinationBadges}
          setSelectedBadges={setSelectedDestinationBadges}
        />
      ))}
    </>
  );
};

export default BadgeLists;