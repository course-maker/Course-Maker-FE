import { getDestinationApi } from "@/api/destination";
import Image from "@/components/commons/Image";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { IMAGES } from "@/constants/images";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import styles from "./DestinationMain.module.scss";

const cx = classNames.bind(styles);

const DestinationMain = () => {
  const { id } = useParams<{ id: string }>();

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", id],
    queryFn: () => getDestinationApi(Number(id)),
    retry: 0,
  });

  const destinationDetail = destinationDetailData ?? defaultDestinationDetail;
  const position = { lat: destinationDetail.location.latitude, lng: destinationDetail.location.longitude };
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
          <Map center={position} className={cx("kakao-map")} style={{ width: "100%", height: "100%" }} level={3}>
            <CustomOverlayMap position={position} xAnchor={0.5} yAnchor={1.1}>
              <div className={cx("marker")}>
                <div className={cx("icon")}>
                  <Image imageInfo={IMAGES.locationIcon} />
                </div>
              </div>
            </CustomOverlayMap>
          </Map>
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
