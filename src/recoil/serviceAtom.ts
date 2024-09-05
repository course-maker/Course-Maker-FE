import { atom, selector } from "recoil";
import { tagResponseDto } from "@/api/tag/type";
import groupTags from "@/utils/groupTags";

export const activeTabState = atom<string>({
  key: "activeTabState",
  default: "여행지 찾기",
});

export const CourseBadgesState = atom<tagResponseDto[]>({
  key: "CourseBadgesState",
  default: [],
});

export const DestinationBadgesState = atom<tagResponseDto[]>({
  key: "DestinationBadgesState",
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
