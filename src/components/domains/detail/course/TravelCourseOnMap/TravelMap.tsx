import { CourseDestination } from "@/api/course/register";
import { Location, LocationWithId } from "@/type/type";
import { useEffect } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
interface TravelMapProps {
  destinations: CourseDestination[];
  selectedLocation: LocationWithId | null;
}

const TravelMap = ({ destinations, selectedLocation }: TravelMapProps) => {
  const positions = destinations.map((destination) => ({
    lat: destination.destination.location.latitude,
    lng: destination.destination.location.longitude,
  }));

  return (
    <Map center={positions[0]} style={{ width: "100%", height: "400px" }}>
      <MarkersAndPolyline positions={positions} selectedLocation={selectedLocation} />
    </Map>
  );
};

interface MarkersAndPolylineProps {
  positions: Location[];
  selectedLocation: LocationWithId | null;
}

const MarkersAndPolyline = ({ positions, selectedLocation }: MarkersAndPolylineProps) => {
  const map = useMap();

  useEffect(() => {
    if (map && selectedLocation) {
      map.setCenter(new kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng));
      map.setLevel(1);
    } else if (map && positions.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      positions.forEach((pos) => bounds.extend(new kakao.maps.LatLng(pos.lat, pos.lng)));
      map.setBounds(bounds);
    }
  }, [map, selectedLocation, positions]);

  return (
    <>
      {positions.map((position, index) => (
        <MapMarker key={index} position={position}>
          <div>{`Marker ${index + 1}`}</div>
        </MapMarker>
      ))}

      <Polyline path={positions} strokeWeight={5} strokeColor="#FFAE00" strokeOpacity={0.7} />
    </>
  );
};

export default TravelMap;
