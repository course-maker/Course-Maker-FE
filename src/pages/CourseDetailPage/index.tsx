import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
import styles from "./CourseDetailPage.module.scss";
import classNames from "classnames/bind";
// import Button from "@/components/commons/Button";
import { Map } from "react-kakao-maps-sdk";
import Mock from "@/mock/courses.json";
// import { IMAGES } from "@/constants/images";
// import Image from "@/components/commons/Image";
// import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DetailLayout from "@/layout/DetailLayout/DetailLayout";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  // const { id } = useParams();
  // const navigate = useNavigate();

  // const handleEditClick = () => {
  //   navigate(`/course/${id}/edit`);
  // };

  // const handleDeleteClick = () => {
  //   // {delete data}
  // };

  const mockdata = Mock;
  const tagList = mockdata.map((item) => item.tags.map((item) => item.description));

  const filteredData = mockdata.filter((item) => {
    return activeDay === 1 ? item.id % 2 === 0 : item.id % 2 !== 0;
  });
  return (
    <DetailLayout>
      <article className={cx("article")}>
        <div>
          <TitleBox
            image={{ src: "/src/assets/images/course_maker_logo.svg", alt: `${`데이터`}해당 이미지` }}
            title={mockdata[0].title}
            // rating={mockdata[0].rating}
            name={mockdata[0].name}
            travelCount={`${mockdata[0].travelerCount}인`}
            duration={`${mockdata[0].duration}일`}
            tags={tagList[0]}
            type="course-detail"
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
          <div className={cx("list-title-group")}>
            <p className={cx("list-title")}>전체 여행지</p>
            <p className={cx("list-explanation")}>여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.</p>
          </div>
          <AllCardList>
            {mockdata.map((item, id) => (
              <div className={cx("item-container")} key={id}>
                <div>
                  <img className={cx("item-image")} src={item.pictureLink} alt={`${item.title} 이미지`} />
                </div>
                <div className={cx("item-box")}>
                  <div className={cx("title-group")}>
                    <p className={cx("item-title")}>{item.title}</p>
                    <p className={cx("item-location")}>{item.location}</p>
                  </div>
                  {/* <div className={cx("score-group")}>
                    <span className={cx("score-item")}>
                      <Image imageInfo={IMAGES.blackHeartIcon} />
                      {item.heart}
                    </span>
                    <span className={cx("score-item")}>
                      <Image imageInfo={IMAGES.blackThumbsUpIcon} />
                      {item.thumbsUp}
                    </span>
                    <span className={cx("score-item")}>
                      <Image imageInfo={IMAGES.blackStarIcon} />
                      {item.rating}
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
          </AllCardList>
        </div>
      </article>
      <article className={cx("schedule")}>
        <div className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            <button
              type="button"
              className={cx("day-btn", { active: activeDay === 1 })}
              onClick={() => setActiveDay(1)}>
              DAY1
            </button>
            <button
              type="button"
              className={cx("day-btn", { active: activeDay === 2 })}
              onClick={() => setActiveDay(2)}>
              DAY2
            </button>
          </div>
          <FilterCardList>
            <div className={cx("scrollable-list")}>
              {filteredData.map((item, id) => (
                <div className={cx("item-container")} key={id}>
                  <div className={cx("number-circle")}>{id + 1}</div>
                  <div>
                    <img className={cx("item-image")} src={item.pictureLink} alt={`${item.title} 이미지`} />
                  </div>
                  <div className={cx("item-box")}>
                    <div className={cx("title-group")}>
                      <p className={cx("item-title")}>{item.title}</p>
                      <p className={cx("item-location")}>{item.location}</p>
                    </div>
                    {/* <div className={cx("score-group")}>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackHeartIcon} />
                          {item.heart}
                        </span>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackThumbsUpIcon} />
                          {item.thumbsUp}
                        </span>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackStarIcon} />
                          {item.rating}
                        </span>
                      </div> */}
                  </div>
                </div>
              ))}
            </div>
          </FilterCardList>
        </div>
        <Map
          center={{ lat: mockdata[0].latitude, lng: mockdata[0].longitude }} // 지도의 중심 좌표 lat/lng 위도/경도
          className={cx("kakao-map")} // 지도 크기
          style={{ width: "68.9rem", height: "50.4rem" }}
          level={3} // 지도 확대 레벨
        />
      </article>
      <article className={cx("content")}>
        <img width={443} height={255} src={mockdata[0].pictureLink} alt={`${mockdata[0].title} 이미지`} />
        <p>{mockdata[0].content}</p>
      </article>
    </DetailLayout>
  );
};

export default CourseDetailPage;
