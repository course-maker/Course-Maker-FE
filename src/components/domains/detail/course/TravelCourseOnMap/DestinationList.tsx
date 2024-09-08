import { CourseDestination } from "@/api/course/register";
import DateTab from "./DateTab";
import DestinationCard from "./DestinationCard";

interface DestinationListProps {
  duration: number;
  courseDestinations: CourseDestination[];
  selectedDestinations: CourseDestination[];
  selectedDate: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
}

const DestinationList = ({ duration, selectedDestinations, selectedDate, setSelectedDate }: DestinationListProps) => {
  const days = Array.from({ length: duration }, (_, i) => i + 1);

  return (
    <>
      <DateTab days={days} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <p>여행지를 클릭하면 여행지 위치를 확인할 수 있습니다.</p>
      <div>
        {selectedDestinations.map((destination) => (
          <DestinationCard
            key={destination.destination.id}
            number={destination.visitOrder}
            title={destination.destination.name}
            address={destination.destination.location.address}
          />
        ))}
      </div>
    </>
  );
};
export default DestinationList;
