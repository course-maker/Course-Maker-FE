import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
import Section from "@/components/commons/Section/Section";
import styles from "./CourseDetailPage.module.scss";
import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { getCourseDetail } from "@/api/course";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const { id } = useParams<{ id: string }>();

  const {
    data: courseDetailData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  if (isSuccess) {
    courseDetailData;
  } else {
    if (isError) {
      isError;
    }
  }

  const sanitizedContent = { __html: DOMPurify.sanitize(courseDetailData?.content as string) };

  const filteredDestinations = courseDetailData?.courseDestinations.filter((item) => item.date === activeDay) || [];

  const mapCenter = {
    lat: filteredDestinations[0]?.destination.location.latitude ?? 37.5665,
    lng: filteredDestinations[0]?.destination.location.longitude ?? 126.978,
  };

  const polylinePath = filteredDestinations.map((item) => ({
    lat: item.destination.location.latitude,
    lng: item.destination.location.longitude,
  }));

  return (
    <div>
      <div className={cx("container")}>
        <Section className={cx("section")}>
          <TitleBox
            image={{ src: `${courseDetailData?.pictureLink}`, alt: `${courseDetailData?.title} 이미지` }}
            title={courseDetailData?.title}
            name={courseDetailData?.member?.nickname}
            travelCount={`${courseDetailData?.travelerCount}인`}
            duration={`${courseDetailData?.duration}일`}
            tags={courseDetailData?.tags || []} // Ensuring correct type
            type="course-detail"
          />
        </Section>
        <Section className={cx("section")}>
          <div className={cx("list-title-group")}>
            <p className={cx("list-title")}>전체 여행지</p>
            <p className={cx("list-explanation")}>여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.</p>
          </div>
          <AllCardList>
            {courseDetailData &&
              courseDetailData.courseDestinations.map((item, id) => (
                <Link to={`/spot/${item.destination.id}`} key={id}>
                  <div className={cx("item-container")}>
                    <div>
                      <img
                        className={cx("item-image")}
                        src={item?.destination?.pictureLink}
                        alt={`${item?.destination?.name} 이미지`}
                      />
                    </div>
                    <div className={cx("item-box")}>
                      <div className={cx("title-group")}>
                        <p className={cx("item-title")}>{item?.destination?.name}</p>
                        <p className={cx("item-location")}>{item?.destination?.location?.address}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </AllCardList>
        </Section>
      </div>
      <div className={cx("container")}>
        <Section className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            {Array.from({ length: courseDetailData?.duration || 0 }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                className={cx("day-btn", { active: activeDay === index + 1 })}
                onClick={() => setActiveDay(index + 1)}>
                DAY{index + 1}
              </button>
            ))}
          </div>
          <FilterCardList>
            <div className={cx("scrollable-list")}>
              {filteredDestinations.map((item, id) => (
                <div className={cx("filter-container")} key={id}>
                  <div className={cx("number-circle")}>{item.visitOrder}</div>
                  <div>
                    <img
                      className={cx("item-image")}
                      src={item.destination.pictureLink}
                      alt={`${item.destination.name} 이미지`}
                    />
                  </div>
                  <div className={cx("item-box")}>
                    <div className={cx("title-group")}>
                      <p className={cx("item-title")}>{item.destination.name}</p>
                      <p className={cx("item-location")}>{item.destination.location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FilterCardList>
        </Section>
        <div>
          <Map
            center={mapCenter}
            className={cx("kakao-map")} // 지도 크기
            style={{ width: "48.9rem", height: "50.4rem" }}
            level={3} // 지도 확대 레벨
          >
            {filteredDestinations.map((item, id) => (
              <CustomOverlayMap
                key={id}
                position={{ lat: item.destination.location.latitude, lng: item.destination.location.longitude }}>
                <div className={cx("marker-label")}>{item.visitOrder}</div>
              </CustomOverlayMap>
            ))}
            {polylinePath.length > 0 && (
              <Polyline
                path={polylinePath}
                strokeWeight={5}
                strokeColor="#FF0000"
                strokeOpacity={0.8}
                strokeStyle="dash"
              />
            )}
          </Map>
        </div>
      </div>
      <div className={cx("content")}>
        <p className={cx("content-text-editor")} dangerouslySetInnerHTML={sanitizedContent} />
      </div>
    </div>
  );
};

export default CourseDetailPage;
