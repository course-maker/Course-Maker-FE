import { getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DestinationList from "./DestinationList";
import TravelMap from "./TravelMap";

const TravelCourseOnMap = () => {
  const [selectedDate, setSelectedDate] = useState(1);

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
        courseDestinations={courseDetail.courseDestinations}
        selectedDestinations={selectedDestinations}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TravelMap destinations={selectedDestinations} />
    </>
  );
};
export default TravelCourseOnMap;
