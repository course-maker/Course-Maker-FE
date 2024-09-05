import { useRecoilState } from "recoil";

import BadgeList from "@/components/commons/BadgeList/BadgeList";
import { CourseBadgesState, DestinationBadgesState } from "@/recoil/serviceAtom";
import { useBadgeListViewModel } from "@/hooks/business/useBadgeListViewModel";
import groupTags from "@/utils/groupTags";

import styles from "./BadgeLists.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface SearchBadgeListProps {
  activeTab?: string;
}

const SearchBadgeLists = ({ activeTab }: SearchBadgeListProps) => {
  const [CourseBadges, setCourseBadges] = useRecoilState(CourseBadgesState);
  const [DestinationBadges, setDestinationBadges] = useRecoilState(DestinationBadgesState);
  const { tagData } = useBadgeListViewModel();
  const groupedTags = groupTags(tagData) || {};

  const selectedBadges = activeTab === "코스 찾기" ? CourseBadges : DestinationBadges;
  const setSelectedBadges = activeTab === "코스 찾기" ? setCourseBadges : setDestinationBadges;

  return (
    <div className={cx("container")}>
      {Object.entries(groupedTags).map(([description, tags]) => (
        <BadgeList
          key={description}
          title={description}
          tags={tags}
          selectedBadges={selectedBadges}
          setSelectedBadges={setSelectedBadges}
        />
      ))}
    </div>
  );
};

export default SearchBadgeLists;
