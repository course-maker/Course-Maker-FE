import { tagResponseDto } from "@/api/tag/type";

const groupTags = (tags: tagResponseDto[]): Record<string, tagResponseDto[]> => {
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

export default groupTags;
