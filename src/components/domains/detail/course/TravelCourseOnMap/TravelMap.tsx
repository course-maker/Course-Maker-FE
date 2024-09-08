import { CourseDestination } from "@/api/course/register";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

interface TravelMapProps {
  destinations: CourseDestination[];
}

const TravelMap = ({ destinations }: TravelMapProps) => {
  const positions = destinations.map((destination) => ({
    lat: destination.destination.location.latitude,
    lng: destination.destination.location.longitude,
  }));

  return (
    <Map center={positions[0]} style={{ width: "100%", height: "400px" }}>
      {/* 여행지 마커 표시 */}
      {positions.map((position, index) => (
        <MapMarker key={index} position={position}>
          <div>{destinations[index].destination.name}</div>
        </MapMarker>
      ))}

      {/* 여행지 경로를 선으로 연결 */}
      <Polyline path={positions} strokeWeight={5} strokeColor="#FFAE00" strokeOpacity={0.7} />
    </Map>
  );
};

export default TravelMap;
