import { LocationWithId } from "@/type/type";
import classNames from "classnames/bind";
import DateTab from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/DateTab";
import DestinationCard from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/DestinationCard";
import styles from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/DestinationList.module.scss";
import { getDestinationResponseDto } from "@/api/destination/type";
import { CourseDestination } from "@/api/course/type";
import TransitTimeChip from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/TransitTimeChip";

import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface DestinationListProps {
  duration: number;
  selectedDestinations: CourseDestination[];
  selectedDate: number;
  onCardClick: (day: number) => void;
  onChipClick: (index: number) => void;
  selectedLocation: LocationWithId | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationWithId | null>>;
  handleOpenModal: () => void;
  handleDestinationToggle: (destination: getDestinationResponseDto) => void;
}

const DestinationList = ({
  duration,
  selectedDestinations,
  selectedDate,
  onCardClick,
  onChipClick,
  selectedLocation,
  setSelectedLocation,
  handleOpenModal,
  handleDestinationToggle,
}: DestinationListProps) => {
  const days = Array.from({ length: duration }, (_, i) => i + 1);

  return (
    <div className={cx("container")}>
      <div>
        <DateTab days={days} selectedDate={selectedDate} onClick={onCardClick} />
      </div>
      <p className={cx("text")}>여행지를 클릭하면 여행지 위치를 확인할 수 있습니다.</p>
      {selectedDestinations.length > 0 ? (
        <div className={cx("cards")}>
          {selectedDestinations?.map((destination, index) => (
            <div className={cx("card")} key={destination.visitOrder}>
              <DestinationCard
                number={destination.visitOrder}
                title={destination.destination.name}
                address={destination.destination.location.address}
                isSelected={selectedLocation?.id === destination.destination.id}
                onClick={() => {
                  setSelectedLocation({
                    id: destination.destination.id,
                    lat: destination.destination.location.latitude,
                    lng: destination.destination.location.longitude,
                  });
                }}
                contents={<DestinationCard.Remove onRemove={() => handleDestinationToggle(destination.destination)} />}
              />
              {selectedDestinations.length - 1 !== index && <TransitTimeChip onClick={() => onChipClick(index)} />}
            </div>
          ))}
        </div>
      ) : (
        <div className={cx("empty")} onClick={handleOpenModal}>
          <Image className={cx("icon")} imageInfo={IMAGES.calendarGreyIcon} />
          <div>경로 추가하기</div>
        </div>
      )}
    </div>
  );
};
export default DestinationList;
