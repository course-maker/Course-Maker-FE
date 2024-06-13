import { useState, useEffect } from "react";
import BadgeListTemp from "../spotRegister/BadgeListTemp";
import axios from "axios";

interface Tag {
  id: number;
  name: string;
  description: string;
}

interface BadgeListsProps {
  selectedDestinationBadges: Tag[];
  onChange: (updatedDestinationBadges: Tag[]) => void;
}

const BadgeLists = ({ selectedDestinationBadges, onChange }: BadgeListsProps) => {
  const [tagsData, setTagsData] = useState<Tag[]>([]);

  const toggleDestinationBadge = (selectedTag: Tag) => {
    const isTagSelected = selectedDestinationBadges.find((tag) => tag.id === selectedTag.id);
    const updatedDestinationBadges = isTagSelected
      ? selectedDestinationBadges.filter((tag) => tag.id !== selectedTag.id)
      : [...selectedDestinationBadges, selectedTag];
    onChange(updatedDestinationBadges);
  };

  const groupTagsByDescription = (tags: Tag[]) => {
    return tags.reduce(
      (acc, tag) => {
        if (!acc[tag.description]) {
          acc[tag.description] = [];
        }
        acc[tag.description].push(tag);
        return acc;
      },
      {} as Record<string, Tag[]>,
    );
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://api.course-maker.net:8080/v1/tags");
        setTagsData(response.data);
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
