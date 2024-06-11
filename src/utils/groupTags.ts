import { Tag } from "@/api/tag";

const groupTags = (tags: Tag[]): Record<string, Tag[]> => {
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

export default groupTags;
