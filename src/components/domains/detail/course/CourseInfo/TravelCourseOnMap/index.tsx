import { Course } from "@/api/course/type";
import { LocationWithId } from "@/type/type";
import { useState } from "react";

import classNames from "classnames/bind";
import DestinationList from "./DestinationList";
import styles from "./TravelCourseOnMap.module.scss";
import TravelMap from "./TravelMap";

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

  const selectedDestinations = courseDetail.courseDestinations.filter(
    (destination) => destination.date === selectedDate,
  );

  const handleChipClick = async (index: number) => {
    const nextPositionIndex = index + 1;
    if (nextPositionIndex < selectedDestinations.length) {
      const currentDestination = selectedDestinations[index];
      const nextDestination = selectedDestinations[nextPositionIndex];

      // 카카오 맵 Geocoder 객체 생성
      const geocoder = new kakao.maps.services.Geocoder();

      // 지번 주소를 도로명 주소로 변환하는 함수
      const getRoadAddress = (address: string) => {
        return new Promise((resolve, reject) => {
          geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 도로명 주소가 있는지 확인
              if (result[0].road_address) {
                resolve(result[0].road_address.address_name); // 도로명 주소 반환
              } else {
                resolve(null); // 도로명 주소가 없는 경우 null 반환
              }
            } else {
              reject(new Error(`Geocoding failed for address: ${address}`));
            }
          });
        });
      };

      try {
        // 출발지와 목적지의 주소를 도로명 주소로 변환 (가능할 경우)
        const currentRoadAddress = await getRoadAddress(currentDestination.destination.location.address);
        const nextRoadAddress = await getRoadAddress(nextDestination.destination.location.address);

        // 도로명 주소가 없을 경우 경고창 띄우기
        if (!currentRoadAddress || !nextRoadAddress) {
          alert("지번 주소만 포함된 위치는 도로명 주소 검색이 불가능합니다.");
          return; // 경고 후 함수 종료
        }

        // 도로명 주소로 카카오맵 링크 생성
        const kakaoMapLink = `https://map.kakao.com/?sName=${encodeURIComponent(
          currentRoadAddress as string,
        )}&eName=${encodeURIComponent(nextRoadAddress as string)}`;

        window.open(kakaoMapLink, "_blank");
      } catch (error) {
        console.error("도로명 주소 변환 실패:", error);
      }
    } else {
      alert("마지막 목적지입니다. 다음 목적지가 없습니다.");
    }
  };

  return (
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
        {selectedDestinations.length > 0 && (
          <TravelMap
            destinations={selectedDestinations}
            selectedLocation={selectedLocation}
            // selectedTransit={selectedTransit}
            // onClick={handleTransitClick}
          />
        )}
      </div>
    </div>
  );
};
export default TravelCourseOnMap;
