import { getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { LocationWithId } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DestinationList from "./DestinationList";
import TravelMap from "./TravelMap";

const TravelCourseOnMap = () => {
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationWithId | null>(null);
  const [selectedTransit, setSelectedTransit] = useState<"car" | "bus">("car");

  const handleDestinationClick = (day: number) => {
    setSelectedDate(day);
    setSelectedLocation(null);
  };

  const handleTransitClick = () => {
    if (selectedTransit === "car") setSelectedTransit("bus");
    else if (selectedTransit === "bus") setSelectedTransit("car");
  };

  const { id } = useParams<{ id: string }>();

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

  const selectedDestinations = courseDetail.courseDestinations.filter(
    (destination) => destination.date === selectedDate,
  );

  return (
    <>
      <DestinationList
        duration={courseDetail.duration}
        selectedDestinations={selectedDestinations}
        selectedDate={selectedDate}
        onClick={handleDestinationClick}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {selectedDestinations.length > 0 && (
        <TravelMap
          destinations={selectedDestinations}
          selectedLocation={selectedLocation}
          selectedTransit={selectedTransit}
          onClick={handleTransitClick}
        />
      )}
    </>
  );
};
export default TravelCourseOnMap;
