import { CourseDestination } from "@/api/course/register";
import { LocationWithId } from "@/type/type";
import { useEffect } from "react";
import { CustomOverlayMap, Map, Polyline, useMap } from "react-kakao-maps-sdk";

import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./MarkersAndPolyline.module.scss";

const cx = classNames.bind(styles);
interface TravelMapProps {
  destinations: CourseDestination[];
  selectedLocation: LocationWithId | null;
  // selectedTransit: "car" | "bus";
  // onClick: () => void;
}

const TravelMap = ({ destinations, selectedLocation }: TravelMapProps) => {
  const positions = destinations.map((destination) => ({
    id: destination.visitOrder,
    lat: destination.destination.location.latitude,
    lng: destination.destination.location.longitude,
  }));

  return (
    <>
      <Map center={positions[0]} style={{ width: "100%", height: "400px" }}>
        <MarkersAndPolyline positions={positions} selectedLocation={selectedLocation} />
      </Map>
      {/* <TransitChangeToggle selectedTransit={selectedTransit} onClick={onClick} /> */}
    </>
  );
};

interface MarkersAndPolylineProps {
  positions: LocationWithId[];
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
        <CustomOverlayMap key={position.id} position={position} xAnchor={0.5} yAnchor={1.1}>
          <div className={cx("marker")}>
            <div className={cx("icon")}>
              <Image imageInfo={IMAGES.markerInMap} />
            </div>
            <div className={cx("order")}>{index + 1}</div>
          </div>
        </CustomOverlayMap>
      ))}

      <Polyline path={positions} strokeWeight={5} strokeColor="#FF7C33" strokeOpacity={0.7} strokeStyle={"dash"} />
    </>
  );
};

export default TravelMap;
