import { useState } from "react";
import { LocationWithId } from "@/type/type";

import styles from "./TravelCourseOnMap.module.scss";
import TravelMap from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/TravelMap";
import TravelCourseModal from "./TravelCourseModal";
import Button from "@/components/commons/Button";
import DestinationList from "./DestinationList";

import { getDestinationResponseDto } from "@/api/destination/type";
import { CourseDestination } from "@/api/course/type";
import { tagResponseDto } from "@/api/tag/type";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface TravelCourseOnMapProps {
  courseDetail: CourseDestination[];
  handleSelect: (selectedDestination: CourseDestination[]) => void;
  duration: number;
}

const TravelCourseOnMap = ({ courseDetail, duration, handleSelect }: TravelCourseOnMapProps) => {
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationWithId | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<CourseDestination[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBadges, setSelectedBadges] = useState<tagResponseDto[]>([]);

  const handleDestinationClick = (day: number) => {
    setSelectedDate(day);
    setSelectedLocation(null);
  };

  const selectedDestinations = courseDetail?.filter(
    (destination: { date: number }) => destination.date === selectedDate,
  );

  const handleDestinationToggle = (destination: getDestinationResponseDto) => {
    console.log(destination);
    // 해당 날짜에 destination이 있는지 확인
    const isAlreadySelected = selectedDestination?.some(
      (d) => d.destination.id === destination.id && d.date === selectedDate,
    );

    // 현재 선택된 날짜에 있는 목적지들만 필터링
    const destinationsForSelectedDate = selectedDestination?.filter((d) => d.date === selectedDate) || [];

    let updatedDestinations: CourseDestination[] | undefined;

    if (isAlreadySelected) {
      // 이미 선택된 경우, 해당 날짜에서만 destination을 제거
      updatedDestinations = selectedDestination?.filter(
        (d) => !(d.date === selectedDate && d.destination.id === destination.id),
      );
    } else {
      // 선택되지 않은 경우, 현재 날짜에 새로운 destination 추가
      const newVisitOrder = destinationsForSelectedDate.length + 1; // 해당 날짜의 목적지 개수 기준으로 visitOrder 설정
      updatedDestinations = [
        ...(selectedDestination || []),
        { visitOrder: newVisitOrder, date: selectedDate, destination },
      ];
    }

    // 상태 업데이트 후 handleSelect 호출
    setSelectedDestination(updatedDestinations);
    handleSelect(updatedDestinations || []);
  };

  const handleChipClick = (index: number) => {
    const nextPositionIndex = index + 1;
    if (nextPositionIndex < selectedDestinations?.length) {
      const currentDestination = selectedDestinations[index];
      const nextDestination = selectedDestinations[nextPositionIndex];

      const kakaoMapLink = `https://map.kakao.com/?sName=${encodeURIComponent(
        currentDestination.destination.location.address,
      )}&eName=${encodeURIComponent(nextDestination.destination.location.address)}`;

      window.open(kakaoMapLink, "_blank");
    } else {
      alert("마지막 목적지입니다. 다음 목적지가 없습니다.");
    }
  };

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 배지 변경 핸들러
  const handleBadgeChange = (badges: tagResponseDto[]) => {
    setSelectedBadges(badges); // 배지 업데이트
  };

  return (
    <>
      {duration > 0 && (
        <div className={cx("container")}>
          <div className={cx("destination-list")}>
            <DestinationList
              duration={duration}
              selectedDestinations={selectedDestinations}
              selectedDate={selectedDate}
              onCardClick={handleDestinationClick}
              onChipClick={handleChipClick}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              handleOpenModal={handleOpenModal}
              handleDestinationToggle={handleDestinationToggle}
            />
          </div>
          {selectedDestinations?.length > 0 && (
            <div className={cx("map")}>
              <TravelMap
                destinations={selectedDestinations}
                selectedLocation={selectedLocation}
                // selectedTransit={selectedTransit}
                // onClick={handleTransitClick}
              />
            </div>
          )}
        </div>
      )}
      <div className={cx("modal-btn")}>
        <Button color="blue" variant="secondary" size="large" onClick={handleOpenModal}>
          경로 추가
        </Button>
      </div>

      {/* 모달 컴포넌트 */}
      <TravelCourseModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedDate={selectedDate}
        selectedDestinations={selectedDestinations}
        handleDestinationToggle={handleDestinationToggle}
        handleBadgeChange={handleBadgeChange}
        selectedBadges={selectedBadges}
      />
    </>
  );
};
export default TravelCourseOnMap;
