import { useState } from "react";
import { LocationWithId } from "@/type/type";
import Skeleton from "react-loading-skeleton";

import styles from "./TravelCourseOnMap.module.scss";
import TravelMap from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/TravelMap";
import BadgeLists from "@/components/commons/BadgeLists/BadgeLists";
import Button from "@/components/commons/Button";
import Modal from "@/components/commons/Modal";
import Image from "@/components/commons/Image";
import DestinationList from "./DestinationList";

import { useGetDestinationQuery } from "@/hooks/destination/queries/useGetDestinationQuery";
import { IMAGES } from "@/constants/images";
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
  const page = 1;
  const { destinationData, isDestinationLoading } = useGetDestinationQuery(page, selectedBadges);

  console.log(courseDetail);
  console.log(selectedBadges);
  console.log(selectedDestination);

  const handleDestinationClick = (day: number) => {
    setSelectedDate(day);
    setSelectedLocation(null);
  };

  const selectedDestinations = courseDetail?.filter(
    (destination: { date: number }) => destination.date === selectedDate,
  );

  const handleDestinationToggle = (destination: getDestinationResponseDto) => {
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
      <Modal isOpen={isModalOpen} onBackdropClick={handleCloseModal}>
        <div className={cx("modal-content")}>
          <div className={cx("txt-container")}>
            <div className={cx("txt-title")}>DAY{selectedDate} 경로 설정</div>
            <span className={cx("txt-sub")}>여행지는 1일당 15개까지 추가 가능합니다.</span>
          </div>

          <div className={cx("path-box")}>
            <div className={cx("BadgeList-box")}>
              <BadgeLists selectedBadges={selectedBadges} onChange={handleBadgeChange} />
            </div>
            <div>
              <div className={cx("destination-section")}>
                <div className={cx("destination-section__header")}>
                  <p className={cx("txt-sub")}>여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.</p>
                </div>
              </div>
              {!isDestinationLoading ? (
                <div className={cx("destination-section__cards")}>
                  {destinationData?.contents?.map((item) => (
                    <div className={cx("item-container")} key={item.id}>
                      <button
                        type="button"
                        className={cx("plus-btn")}
                        onClick={() => handleDestinationToggle(item as getDestinationResponseDto)}>
                        {selectedDestinations.some((d) => d.destination.id === item.id) ? (
                          <Image className={cx("img")} imageInfo={IMAGES.check} />
                        ) : (
                          <Image className={cx("img")} imageInfo={IMAGES.plus} />
                        )}
                      </button>
                      <div>
                        <img className={cx("item-image")} src={item.pictureLink} alt={`${item.name} 이미지`} />
                      </div>
                      <div className={cx("item-box")}>
                        <div className={cx("title-group")}>
                          <p className={cx("item-title")}>{item.name}</p>
                          <p className={cx("item-location")}>{item.location.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cx("destination-section__cards")}>
                  {Array.from({ length: 4 }).map((_, id) => (
                    <div className={cx("item-container")} key={id}>
                      <button type="button" className={cx("plus-btn")}>
                        <Image className={cx("img")} imageInfo={IMAGES.plus} />
                      </button>
                      <div>
                        <Skeleton className={cx("item-image")} height="9.5911rem" width="12.64rem" />
                      </div>
                      <div className={cx("item-box")}>
                        <div className={cx("title-group")}>
                          <Skeleton className={cx("item-title")} count={3} height="1rem" width="70%" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button color="blue" variant="secondary" size="large" onClick={handleCloseModal}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default TravelCourseOnMap;
