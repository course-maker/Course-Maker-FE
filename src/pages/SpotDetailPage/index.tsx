import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { Map } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./SpotDetailPage.module.scss";

import { getDestinationApi } from "@/api/destination";
import Image from "@/components/commons/Image";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
import { IMAGES } from "@/constants/images";
import DetailLayout from "@/layout/DetailLayout/DetailLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import Button from "@/components/commons/Button";

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

  const { nickname, name, tags, location, pictureLink, content } = spotDetailData;
  const sanitizedContent = { __html: DOMPurify.sanitize(content) };

  // const { id } = useParams();
  // const navigate = useNavigate();

  // const handleEditClick = () => {
  //   navigate(`/spot/${id}/edit`);
  // };

  // const handleDeleteClick = () => {
  //   // {delete data}
  // };
  return (
    <DetailLayout>
      <section className={cx("section")}>
        <article className={cx("article")}>
          <div>
            <TitleBox
              image={{ src: `${pictureLink}`, alt: `${`데이터`}해당 이미지` }}
              title={name}
              // rating={mockdata[0].rating}
              name={nickname}
              travelCount={null}
              duration={null}
              tags={tags}
              type="spot-detail"
            />
            {/* <div className={cx("btn-group")}>
              <Button onClick={handleEditClick} variant="secondary" color="navy">
                수정하기
              </Button>
              <Button onClick={handleDeleteClick} variant="primary" color="gray">
                삭제하기
              </Button>
            </div> */}
          </div>
          <div className={cx("kakao-map")}>
            <Map
              center={{ lat: location.latitude, lng: location.longitude }} // 지도의 중심 좌표 lat/lng 위도/경도
              className={cx("kakao-map")} // 지도 크기
              style={{ width: "50rem", height: "45.7rem" }}
              level={3} // 지도 확대 레벨
            />
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
    </DetailLayout>
  );
};

export default SpotDetailPage;
