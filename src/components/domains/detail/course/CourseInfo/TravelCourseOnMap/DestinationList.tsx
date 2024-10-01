import { CourseDestination } from "@/api/course/register";
import { LocationWithId } from "@/type/type";
import classNames from "classnames/bind";
import DateTab from "./DateTab";
import DestinationCard from "./DestinationCard";
import styles from "./DestinationList.module.scss";
import TransitTimeChip from "./TransitTimeChip";

const cx = classNames.bind(styles);

interface DestinationListProps {
  duration: number;
  selectedDestinations: CourseDestination[];
  selectedDate: number;
  onCardClick: (day: number) => void;
  onChipClick: (index: number) => void;
  selectedLocation: LocationWithId | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationWithId | null>>;
}

const DestinationList = ({
  duration,
  selectedDestinations,
  selectedDate,
  onCardClick,
  onChipClick,
  selectedLocation,
  setSelectedLocation,
}: DestinationListProps) => {
  const days = Array.from({ length: duration }, (_, i) => i + 1);

  const handleCardClick = (destination: CourseDestination) => {
    const { id, location } = destination.destination;

    if (location.latitude && location.longitude) {
      setSelectedLocation({
        id: id,
        lat: location.latitude,
        lng: location.longitude,
      });
    } else {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(location.address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const lat = parseFloat(result[0].y);
          const lng = parseFloat(result[0].x);
          setSelectedLocation({
            id: id,
            lat: lat,
            lng: lng,
          });
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    }
  };

  return (
    <div className={cx("container")}>
      <div>
        <DateTab days={days} selectedDate={selectedDate} onClick={onCardClick} />
      </div>
      <p className={cx("text")}>여행지를 클릭하면 여행지 위치를 확인할 수 있습니다.</p>
      <div className={cx("cards")}>
        {selectedDestinations.map((destination, index) => (
          <div className={cx("card")} key={destination.visitOrder}>
            <DestinationCard
              number={destination.visitOrder}
              title={destination.destination.name}
              address={destination.destination.location.address}
              isSelected={selectedLocation?.id === destination.destination.id}
              onClick={() => handleCardClick(destination)}
            />
            {selectedDestinations.length - 1 !== index && <TransitTimeChip onClick={() => onChipClick(index)} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
