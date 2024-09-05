import { atom, selector } from "recoil";
import { tagResponseDto } from "@/api/tag/type";
import groupTags from "@/utils/groupTags";

export const activeTabState = atom<string>({
  key: "activeTabState",
  default: "여행지 찾기",
});

export const selectedCourseBadgesState = atom<tagResponseDto[]>({
  key: "selectedCourseBadgesState",
  default: [],
});

export const selectedDestinationBadgesState = atom<tagResponseDto[]>({
  key: "selectedDestinationBadgesState",
  default: [],
});

export const tagsDataState = atom<tagResponseDto[]>({
  key: "tagsDataState",
  default: [],
});

export const groupedTagsSelector = selector<Record<string, tagResponseDto[]>>({
  key: "groupedTagsSelector",
  get: ({ get }) => {
    const tagsData = get(tagsDataState);
    return groupTags(tagsData);
  },
});
