import { getDestinationApi } from "@/api/destination";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import styles from "./DestinationDetailPage.module.scss";
import Section from "@/components/commons/Section/Section";

const cx = classNames.bind(styles);

const SpotDetailPage = () => {
  const { id } = useParams();
  const postId = Number(id);

  const { data: spotDetailData } = useQuery({
    queryKey: ["spotEdit", postId],
    queryFn: () => getDestinationApi(postId),
    enabled: !!postId,
  });

  if (!spotDetailData) {
    return <div>Loading...</div>;
  }

  const { location, content } = spotDetailData;
  const sanitizedContent = { __html: DOMPurify.sanitize(content) };

  return (
    <Section>
      <section className={cx("section")}>
        <article className={cx("article")}>
          <div className={cx("kakao-map")}>
            <Map
              center={{ lat: location.latitude, lng: location.longitude }}
              className={cx("kakao-map")}
              style={{ width: "50rem", height: "45.7rem" }}
              level={3}>
              <MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
            </Map>

            <div className={cx("location")}>
              <div>
                <Image imageInfo={IMAGES.locationIcon} />
              </div>
              <p className={cx("location-text")}>{location.address}</p>
            </div>
          </div>
        </article>
        <article className={cx("content")}>
          <p className={cx("content-text-editor")} dangerouslySetInnerHTML={sanitizedContent} />
        </article>
      </section>
    </Section>
  );
};

export default SpotDetailPage;
