import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
import Section from "@/components/commons/Section/Section";
import styles from "./CourseDetailPage.module.scss";
import classNames from "classnames/bind";

import { getCourseDetail } from "@/api/course";
import { Course } from "@/api/course/type";
import { Map } from "react-kakao-maps-sdk";
import Mock from "@/mock/courses.json";

// import Button from "@/components/commons/Button";
// import { IMAGES } from "@/constants/images";
// import Image from "@/components/commons/Image";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  const [course, setCourse] = useState<Course>();
  const [activeDay, setActiveDay] = useState(1);
  const { id } = useParams();
  // const navigate = useNavigate();

  // const handleEditClick = () => {
  //   navigate(`/course/${id}/edit`);
  // };

  // const handleDeleteClick = () => {
  //   // {delete data}
  // };

  // 코스 정보
  useEffect(() => {
    const fetchLists = async () => {
      // setLoading(true);
      try {
        const response = await getCourseDetail(id);
        console.log(response);
        setCourse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // finally {
      //   setLoading(false);
      // }
    };
    fetchLists();
  }, [id]);
  const mockdata = Mock;
  const tagList = mockdata.map((item) => item.tags.map((item) => item.description));

  // const filteredData = mockdata.filter((item) => {
  //   console.log(item);
  //   return activeDay === 1 ? item.id % 2 === 0 : item.id % 2 !== 0;
  // });
  return (
    <div>
      <div className={cx("container")}>
        <Section className={cx("section")}>
          <TitleBox
            image={{ src: "/src/assets/images/course_maker_logo.svg", alt: `${`데이터`}해당 이미지` }}
            title={course?.title}
            // rating={mockdata[0].rating}
            name={course?.member?.nickname}
            travelCount={`${course?.travelerCount}인`}
            duration={`${course?.duration}일`}
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
        </Section>
        <Section className={cx("section")}>
          <div className={cx("list-title-group")}>
            <p className={cx("list-title")}>전체 여행지</p>
            <p className={cx("list-explanation")}>여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.</p>
          </div>
          <AllCardList>
            {course &&
              course.courseDestinations.map((item, id) => (
                <div className={cx("item-container")} key={id}>
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
        </Section>
      </div>
      <div className={cx("container")}>
        <Section className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            {Array.from({ length: course?.duration }, (_, index) => (
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
              {course &&
                course?.courseDestinations
                  .filter((item) => item.date === activeDay)
                  .map((item) => (
                    <div className={cx("item-container")} key={item.visitOrder}>
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
        </Section>
        <Map
          // center={{
          //   lat: course?.courseDestinations[0]?.destination?.location?.latitude,
          //   lng: course?.courseDestinations[0]?.destination?.location?.longitude,
          // }} // 지도의 중심 좌표 lat/lng 위도/경도
          center={{ lat: mockdata[0].latitude, lng: mockdata[0].longitude }} // 지도의 중심 좌표 lat/lng 위도/경도
          className={cx("kakao-map")} // 지도 크기
          style={{ width: "48.9rem", height: "50.4rem" }}
          level={3} // 지도 확대 레벨
        />
      </div>
      <div className={cx("content")}>
        <img width={443} src={course?.pictureLink} alt={`${course?.title} 이미지`} />
        <p>{course?.content}</p>
      </div>
    </div>
  );
};

export default CourseDetailPage;
