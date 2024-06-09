import styles from "./CourseRegisterPage.module.scss";
import classNames from "classnames/bind";
import { Step1, Step2, Step3, Step, Stepper } from "@/components/commons/Steppers";
import { StepperProvider } from "@/components/commons/Steppers/StepperContext";
import Slider from "@/components/commons/SliderBar/SliderBar";
import data from "../SearchPage/data.json";
import { useEffect, useState } from "react";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";
import Mock from "@/mock/courses.json";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import { IMAGES } from "@/constants/images";
import Image from "../../components/commons/Image/index";
import { CustomOverlayMap, Map, Polyline } from "react-kakao-maps-sdk";

const cx = classNames.bind(styles);
const courseData = data.courseData;
const mockdata = Mock;
const destinationData = data.destinationData;

const CourseRegisterPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [mapCenter, setMapCenter] = useState({ lat: mockdata[0].latitude, lng: mockdata[0].longitude });
  const [selectedBadges, setSelectedBadges] = useState<{ step1: string[]; step2: string[] }>({
    step1: [],
    step2: [],
  });

  const toggleBadge = (badge: string, step: number) => {
    setSelectedBadges((prevSelected) => {
      const key = step === 1 ? "step1" : "step2";
      const prevSelectedStep = prevSelected[key];

      const updatedSelected = prevSelectedStep.includes(badge)
        ? prevSelectedStep.filter((item) => item !== badge)
        : [...prevSelectedStep, badge];

      return {
        ...prevSelected,
        [key]: updatedSelected,
      };
    });
  };
  const filteredData = mockdata.filter((item) => {
    return activeDay === 1 ? item.id % 2 === 0 : item.id % 2 !== 0;
  });

  useEffect(() => {
    if (mockdata.length > 0) {
      setMapCenter({ lat: mockdata[0].latitude, lng: mockdata[0].longitude });
    }
  }, [mockdata]);
  return (
    <StepperProvider>
      <section className={cx("section")}>
        <form className={cx("stepper-container")}>
          <Stepper>
            <Step stepNumber={1}>
              <Step1>
                <Slider type="Duration" />
                <Slider type="TravelCount" />
                <p className={cx("BadgeList-title")}>태그선택</p>
                <div className={cx("BadgeList-box")}>
                  {Object.entries(courseData).map(([title, badges]) => (
                    <RegisterBadgeList
                      key={title}
                      title={title}
                      badges={badges}
                      selectedBadges={selectedBadges.step1}
                      toggleBadge={(badge) => toggleBadge(badge, 1)}
                    />
                  ))}
                </div>
              </Step1>
            </Step>
            <Step stepNumber={2}>
              <Step2>
                <div>
                  <p className={cx("path-title")}>경로설정</p>
                </div>
                <div className={cx("path-box")}>
                  <div className={cx("BadgeList-box")}>
                    {Object.entries(destinationData).map(([title, badges]) => (
                      <RegisterBadgeList
                        key={title}
                        title={title}
                        badges={badges}
                        selectedBadges={selectedBadges.step2}
                        toggleBadge={(badge) => toggleBadge(badge, 2)}
                      />
                    ))}
                  </div>
                  <AllCardList>
                    {mockdata.map((item, id) => (
                      <div className={cx("item-container")} key={id}>
                        <button type="button" className={cx("plus-btn")}>
                          <Image imageInfo={IMAGES.plus} />
                        </button>
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
                <div className={cx("schedule")}>
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
                    center={mapCenter}
                    className={cx("kakao-map")}
                    style={{ width: "68.9rem", height: "100%" }}
                    level={8}>
                    {filteredData.map((item, id) => (
                      <div key={id}>
                        <CustomOverlayMap position={{ lat: item.latitude, lng: item.longitude }}>
                          <div className={cx("marker-label")}>{id + 1}</div>
                        </CustomOverlayMap>
                      </div>
                    ))}
                    <Polyline
                      path={filteredData.map((item) => ({ lat: item.latitude, lng: item.longitude }))}
                      strokeWeight={5}
                      strokeColor="#FF0000"
                      strokeOpacity={0.8}
                      strokeStyle="dash"
                    />
                  </Map>
                </div>
              </Step2>
            </Step>
            <Step stepNumber={3}>
              <Step3>
                <div className={cx("schedule-container")}>
                  <div className={cx("schedule-item-group")}>
                    <div className={cx("schedule-item-tags")}>
                      <p className={cx("schedule-item-title")}>선택한 태그</p>
                      <div className={cx("tag-box")}>
                        {mockdata[0].tags.map((tag, id) => (
                          <span key={id} className={cx("tag-item")}>
                            {tag.description}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={cx("schedule-item-option")}>
                      <div className={cx("schedule-item-box")}>
                        <p className={cx("schedule-item-title")}>여행기간</p>
                        <p className={cx("schedule-item-text")}>2일</p>
                      </div>
                      <div className={cx("schedule-item-box")}>
                        <p className={cx("schedule-item-title")}>여행추천인원</p>
                        <p className={cx("schedule-item-text")}>5인 이상</p>
                      </div>
                    </div>
                  </div>
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
                      <div className={cx("scrollable-list2")}>
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
                </div>
                <div className={cx("course-input-group")}>
                  <input type="text" placeholder="코스 이름을 입력하세요." className={cx("course-title-input")} />
                </div>
              </Step3>
            </Step>
          </Stepper>
        </form>
      </section>
    </StepperProvider>
  );
};

export default CourseRegisterPage;
