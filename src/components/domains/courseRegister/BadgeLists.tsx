import { useState, useEffect } from "react";
import BadgeListTemp from "./BadgeListTemp/BadgeListTemp";
import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";

interface BadgeListsProps {
  selectedDestinationBadges: tagResponseDto[];
  onChange: (updatedDestinationBadges: tagResponseDto[]) => void;
}

const BadgeLists = ({ selectedDestinationBadges, onChange }: BadgeListsProps) => {
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);

  const toggleDestinationBadge = (selectedTag: tagResponseDto) => {
    const isTagSelected = selectedDestinationBadges.find((tag) => tag.id === selectedTag.id);
    const updatedDestinationBadges = isTagSelected
      ? selectedDestinationBadges.filter((tag) => tag.id !== selectedTag.id)
      : [...selectedDestinationBadges, selectedTag];
    onChange(updatedDestinationBadges);
  };

  const groupTagsByDescription = (tags: tagResponseDto[]) => {
    return tags.reduce(
      (acc, tag) => {
        if (!acc[tag.description]) {
          acc[tag.description] = [];
        }
        acc[tag.description].push(tag);
        return acc;
      },
      {} as Record<string, tagResponseDto[]>,
    );
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getTag();
        setTagsData(response);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLists();
  }, []);

  const groupedTags = groupTagsByDescription(tagsData);
  return (
    <>
      {Object.entries(groupedTags).map(([description, tags]) => (
        <BadgeListTemp
          key={description}
          title={description}
          tags={tags}
          selectedBadges={selectedDestinationBadges}
          toggleBadge={toggleDestinationBadge}
        />
      ))}
    </>
  );
};

export default BadgeLists;
