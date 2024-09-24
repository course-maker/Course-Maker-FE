import { Course } from "@/api/course/type";
import { LocationWithId } from "@/type/type";
import { useState } from "react";

import classNames from "classnames/bind";
import DestinationList from "./DestinationList";
import styles from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/TravelCourseOnMap.module.scss";
import TravelMap from "@/components/domains/detail/course/CourseInfo/TravelCourseOnMap/TravelMap";
import Button from "@/components/commons/Button";
const cx = classNames.bind(styles);

interface TravelCourseOnMapProps {
  courseDetail: Course;
}

const TravelCourseOnMap = ({ courseDetail }: TravelCourseOnMapProps) => {
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationWithId | null>(null);
  // const [selectedTransit, setSelectedTransit] = useState<"car" | "bus">("car");

  console.log(courseDetail);
  const handleDestinationClick = (day: number) => {
    setSelectedDate(day);
    setSelectedLocation(null);
  };

  // const handleTransitClick = () => {
  //   if (selectedTransit === "car") setSelectedTransit("bus");
  //   else if (selectedTransit === "bus") setSelectedTransit("car");
  // };

  const selectedDestinations = courseDetail?.courseDestinations?.filter(
    (destination) => destination.date === selectedDate,
  );

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

  return (
    <>
      {courseDetail && (
        <div className={cx("container")}>
          <div className={cx("destination-list")}>
            <DestinationList
              duration={courseDetail.duration}
              selectedDestinations={selectedDestinations}
              selectedDate={selectedDate}
              onCardClick={handleDestinationClick}
              onChipClick={handleChipClick}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
          <div className={cx("map")}>
            {selectedDestinations?.length > 0 && (
              <TravelMap
                destinations={selectedDestinations}
                selectedLocation={selectedLocation}
                // selectedTransit={selectedTransit}
                // onClick={handleTransitClick}
              />
            )}
          </div>
        </div>
      )}
      <div className={cx("modal-btn")}>
        <Button color="blue" variant="secondary" size="large" type="submit">
          경로 추가
        </Button>
      </div>
    </>
  );
};
export default TravelCourseOnMap;
