import styles from "./SpotDetailPage.module.scss";
import classNames from "classnames/bind";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
// import Button from "@/components/commons/Button";
import { Map } from "react-kakao-maps-sdk";
import Mock from "@/mock/courses.json";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image";
import DetailLayout from "@/layout/DetailLayout/DetailLayout";
// import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const SpotDetailPage = () => {
  const mockdata = Mock;
  const tagList = mockdata.map((item) => item.tags.map((item) => item.description));

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
              image={{ src: "/src/assets/images/course_maker_logo.svg", alt: `${`데이터`}해당 이미지` }}
              title={mockdata[0].title}
              // rating={mockdata[0].rating}
              name={mockdata[0].name}
              travelCount={null}
              duration={null}
              tags={tagList[0]}
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
          <div>
            <Map
              center={{ lat: mockdata[0].latitude, lng: mockdata[0].longitude }} // 지도의 중심 좌표 lat/lng 위도/경도
              className={cx("kakao-map")} // 지도 크기
              style={{ width: "62.5rem", height: "45.7rem" }}
              level={3} // 지도 확대 레벨
            />
            <div className={cx("location")}>
              <div>
                <Image imageInfo={IMAGES.locationIcon} />
              </div>
              <p className={cx("location-text")}>{mockdata[0].location}</p>
            </div>
          </div>
        </article>
        <article className={cx("content")}>
          <img width={443} height={255} src={mockdata[0].pictureLink} alt={`${mockdata[0].title} 이미지`} />
          <p>{mockdata[0].content}</p>
        </article>
      </section>
    </DetailLayout>
  );
};

export default SpotDetailPage;
