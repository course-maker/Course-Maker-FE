import { CourseDestination } from "@/api/course/register";
import { LocationWithId } from "@/type/type";
import DateTab from "./DateTab";
import DestinationCard from "./DestinationCard";

interface DestinationListProps {
  duration: number;
  selectedDestinations: CourseDestination[];
  selectedDate: number;
  onClick: (day: number) => void;
  selectedLocation: LocationWithId | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationWithId | null>>;
}

const DestinationList = ({
  duration,
  selectedDestinations,
  selectedDate,
  onClick,
  selectedLocation,
  setSelectedLocation,
}: DestinationListProps) => {
  const days = Array.from({ length: duration }, (_, i) => i + 1);

  return (
    <>
      <DateTab days={days} selectedDate={selectedDate} onClick={onClick} />
      <p>여행지를 클릭하면 여행지 위치를 확인할 수 있습니다.</p>
      <div>
        {selectedDestinations.map((destination) => (
          <DestinationCard
            key={destination.destination.id}
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
          />
        ))}
      </div>
    </>
  );
};
export default DestinationList;
