import { CourseDestination } from "@/api/course/register";
import { LocationWithId } from "@/type/type";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polyline, useMap } from "react-kakao-maps-sdk";

import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./MarkersAndPolyline.module.scss";

const cx = classNames.bind(styles);

interface TravelMapProps {
  destinations: CourseDestination[];
  selectedLocation: LocationWithId | null;
}

const TravelMap = ({ destinations, selectedLocation }: TravelMapProps) => {
  const [positions, setPositions] = useState<LocationWithId[]>([]);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    const fetchCoordinates = async () => {
      const newPositions: LocationWithId[] = [];

      for (const destination of destinations) {
        const { latitude, longitude, address } = destination.destination.location;

        if (latitude && longitude) {
          newPositions.push({
            id: destination.visitOrder,
            lat: latitude,
            lng: longitude,
          });
        } else {
          const coordinates = await new Promise<kakao.maps.LatLng>((resolve, reject) => {
            geocoder.addressSearch(address, function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const lat = parseFloat(result[0].y);
                const lng = parseFloat(result[0].x);
                resolve(new kakao.maps.LatLng(lat, lng));
              } else {
                reject(new Error(`Geocoding failed for address: ${address}`));
              }
            });
          });

          newPositions.push({
            id: destination.visitOrder,
            lat: coordinates.getLat(),
            lng: coordinates.getLng(),
          });
        }
      }

      setPositions(newPositions);
    };

    fetchCoordinates();
  }, [destinations]);

  return (
    <>
      {positions.length > 0 && (
        <Map center={positions[0]} style={{ width: "100%", height: "100%" }}>
          <MarkersAndPolyline positions={positions} selectedLocation={selectedLocation} />
        </Map>
      )}
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
