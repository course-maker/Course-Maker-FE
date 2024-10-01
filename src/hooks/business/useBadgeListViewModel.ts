import { useRecoilState } from "recoil";
import { useGetTagQuery } from "@/hooks/tag/queries/useGetTagQuery";
import { CourseBadgesState, DestinationBadgesState } from "@/recoil/serviceAtom";
import { tagResponseDto } from "@/api/tag/type";

export const useBadgeListViewModel = () => {
  const { tagData, isTagLoading } = useGetTagQuery();
  const [CourseBadges, setCourseBadges] = useRecoilState<tagResponseDto[]>(CourseBadgesState);
  const [DestinationBadges, setDestinationBadges] = useRecoilState<tagResponseDto[]>(DestinationBadgesState);

  //태그 데이터 패칭 여부 확인
  if (isTagLoading) {
    console.log("Loading tags data...");
    return { isTagLoading, tagData: null };
  }

  return { isTagLoading, tagData, DestinationBadges, CourseBadges, setCourseBadges, setDestinationBadges };
};
