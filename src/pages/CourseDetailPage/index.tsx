import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import TitleBox from "@/components/commons/TitleBox/TitleBox";
import Section from "@/components/commons/Section/Section";
import styles from "./CourseDetailPage.module.scss";
import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { getCourseDetail } from "@/api/course";
import { Course } from "@/api/course/type";
import { Tag } from "@/api/destination/type"; // Make sure to import the Tag type
import { Map } from "react-kakao-maps-sdk";
import Mock from "@/mock/courses.json";

const cx = classNames.bind(styles);

const CourseDetailPage = () => {
  const [course, setCourse] = useState<Course>();
  const [activeDay, setActiveDay] = useState(1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        if (!id) return;
        const response = await getCourseDetail(Number(id));
        console.log(response);
        setCourse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLists();
  }, [id]);

  const mockdata = Mock;
  const tagList: Tag[][] = mockdata.map((item) =>
    item.tags.map((tag) => ({
      id: tag.id,
      name: tag.description,
      description: tag.description,
    })),
  );

  const sanitizedContent = { __html: DOMPurify.sanitize(course?.content as string) };

  return (
    <div>
      <div className={cx("container")}>
        <Section className={cx("section")}>
          <TitleBox
            image={{ src: "/src/assets/images/course_maker_logo.svg", alt: `${course?.title} 이미지` }}
            title={course?.title}
            name={course?.member?.nickname}
            travelCount={`${course?.travelerCount}인`}
            duration={`${course?.duration}일`}
            tags={tagList[0]} // Ensuring correct type
            type="course-detail"
          />
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
                  </div>
                </div>
              ))}
          </AllCardList>
        </Section>
      </div>
      <div className={cx("container")}>
        <Section className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            {Array.from({ length: course?.duration || 0 }, (_, index) => (
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
                course.courseDestinations
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
                      </div>
                    </div>
                  ))}
            </div>
          </FilterCardList>
        </Section>
        <Map
          center={{ lat: mockdata[0].latitude, lng: mockdata[0].longitude }} // 지도 중심 좌표
          className={cx("kakao-map")} // 지도 크기
          style={{ width: "48.9rem", height: "50.4rem" }}
          level={3} // 지도 확대 레벨
        />
      </div>
      <div className={cx("content")}>
        <img width={443} src={course?.pictureLink} alt={`${course?.title} 이미지`} />
        <p className={cx("content-text-editor")} dangerouslySetInnerHTML={sanitizedContent} />
      </div>
    </div>
  );
};

export default CourseDetailPage;
