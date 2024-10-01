import { getDestinationApi } from "@/api/destination";
import Image from "@/components/commons/Image";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { IMAGES } from "@/constants/images";
import { authState } from "@/recoil/authAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useEffect, useState } from "react"; // useState, useEffect 추가
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./DestinationMain.module.scss";

const cx = classNames.bind(styles);

const DestinationMain = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth] = useRecoilState(authState);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);

  const fetchDestinationDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getDestinationApi(Number(id), options);
  };

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", id],
    queryFn: fetchDestinationDetail,
    retry: 0,
  });

  const destinationDetail = destinationDetailData ?? defaultDestinationDetail;

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    if (destinationDetail.location.latitude && destinationDetail.location.longitude) {
      setPosition({
        lat: destinationDetail.location.latitude,
        lng: destinationDetail.location.longitude,
      });
    } else {
      setIsLoadingPosition(true);
      geocoder.addressSearch(destinationDetail.location.address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setPosition({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        } else {
          console.error("Geocoding failed:", status);
        }
        setIsLoadingPosition(false);
      });
    }
  }, [destinationDetail]);

  return (
    <div className={cx("container")}>
      <div className={cx("main-image")}>
        <Image
          imageInfo={{ src: destinationDetail?.pictureLink, alt: `${destinationDetail.name} 대표 이미지` }}
          objectFit="cover"
        />
        {destinationDetail.isApiData && (
          <div className={cx("logo")}>
            <Image imageInfo={IMAGES.apiDataLogo} />
          </div>
        )}
      </div>

      <div className={cx("map-location")}>
        <div className={cx("map")}>
          {isLoadingPosition ? (
            <div>Loading map...</div>
          ) : position ? (
            <Map center={position} className={cx("kakao-map")} style={{ width: "100%", height: "100%" }} level={3}>
              <CustomOverlayMap position={position} xAnchor={0.5} yAnchor={1.1}>
                <div className={cx("marker")}>
                  <div className={cx("icon")}>
                    <Image imageInfo={IMAGES.locationIcon} />
                  </div>
                </div>
              </CustomOverlayMap>
            </Map>
          ) : (
            <div>위치를 찾을 수 없습니다.</div>
          )}
        </div>

        <div className={cx("location")}>
          <div className={cx("img")}>
            <Image imageInfo={IMAGES.grayLocation} />
          </div>
          <p className={cx("text")}>{destinationDetail.location.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationMain;
