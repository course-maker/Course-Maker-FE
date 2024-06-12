import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { step1State, step2State } from "@/recoil/stepsAtom";
import classNames from "classnames/bind";
import styles from "./Step2.module.scss";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { Destination } from "@/api/course/type";
import { useQuery } from "@tanstack/react-query";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";
import { getDestinationApi } from "@/api/destination";
import data from "../../../../../pages/SearchPage/data.json";
const cx = classNames.bind(styles);

const Step2: React.FC = () => {
  const step1 = useRecoilValue(step1State);
  const [step2, setStep2] = useRecoilState(step2State);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [filteredData, setFilteredData] = useState<Destination[]>([]);

  const courseData = data.courseData;

  const { data: destinationData, isSuccess } = useQuery({
    queryKey: ["destinationData"],
    queryFn: () => getDestinationApi({ currentPage: 1, totalPage: 1, pagingSlice: 1, contents: [] }),
  });

  useEffect(() => {
    if (isSuccess && destinationData) {
      setAllDestinations(destinationData.contents);
    }
  }, [isSuccess, destinationData]);

  useEffect(() => {
    const tags = step1.tags;
    const filtered = allDestinations.filter((destination) => destination.tags.some((tag) => tags.includes(tag.name)));
    setFilteredData(filtered);
  }, [allDestinations, step1.tags]);

  const handleDestinationToggle = (destinationName: string) => {
    const destination = allDestinations.find((d) => d.name === destinationName);
    if (!destination) return;
    const updatedDestinations = step2.courseDestinations[activeDay] ? [...step2.courseDestinations[activeDay]] : [];
    const destinationIndex = updatedDestinations.findIndex((d) => d.id === destination.id);

    if (destinationIndex === -1) {
      updatedDestinations.push(destination);
      console.log(filteredData);
    } else {
      updatedDestinations.splice(destinationIndex, 1);
    }

    setStep2({
      ...step2,
      courseDestinations: {
        ...step2.courseDestinations,
        [activeDay]: updatedDestinations,
      },
    });
  };

  const mapCenter =
    step2.courseDestinations[activeDay] && step2.courseDestinations[activeDay].length > 0
      ? {
          lat: step2.courseDestinations[activeDay][0].location.latitude,
          lng: step2.courseDestinations[activeDay][0].location.longitude,
        }
      : { lat: 37.5665, lng: 126.978 };

  const polylinePath =
    step2.courseDestinations[activeDay]?.map((item) => ({
      lat: item.location.latitude,
      lng: item.location.longitude,
    })) || [];

  return (
    <>
      <div>
        <p className={cx("path-title")}>경로 설정</p>
      </div>
      <div className={cx("path-box")}>
        <div className={cx("BadgeList-box")}>
          {Object.entries(courseData).map(([title, badges]) => (
            <RegisterBadgeList
              key={title}
              title={title}
              badges={badges}
              selectedBadges={step1.tags}
              toggleBadge={handleDestinationToggle}
            />
          ))}
        </div>
        <AllCardList>
          {destinationData?.contents.map((item, id) => (
            <div className={cx("item-container")} key={id}>
              <button type="button" className={cx("plus-btn")} onClick={() => handleDestinationToggle(item.name)}>
                <Image imageInfo={IMAGES.plus} />
              </button>
              <div>
                <img className={cx("item-image")} src={item.pictureLink} alt={`${item.name} 이미지`} />
              </div>
              <div className={cx("item-box")}>
                <div className={cx("title-group")}>
                  <p className={cx("item-title")}>{item.name}</p>
                  <p className={cx("item-location")}>{item.location.address}</p>
                </div>
              </div>
            </div>
          ))}
        </AllCardList>
      </div>
      <div className={cx("schedule")}>
        <div className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            {[...Array(step1.duration)].map((_, index) => (
              <button
                type="button"
                className={cx("day-btn", { active: activeDay === index + 1 })}
                onClick={() => setActiveDay(index + 1)}
                key={index}>
                DAY{index + 1}
              </button>
            ))}
          </div>
          <FilterCardList>
            <div className={cx("scrollable-list")}>
              {step2.courseDestinations[activeDay]?.map((item, id) => (
                <div className={cx("item-container")} key={id}>
                  <div className={cx("number-circle")}>{id + 1}</div>
                  <div>
                    <img className={cx("item-image")} src={item.pictureLink} alt={`${item.name} 이미지`} />
                  </div>
                  <div className={cx("item-box")}>
                    <div className={cx("title-group")}>
                      <p className={cx("item-title")}>{item.name}</p>
                      <p className={cx("item-location")}>{item.location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FilterCardList>
        </div>
        <Map center={mapCenter} className={cx("kakao-map")} style={{ width: "68.9rem", height: "100%" }} level={8}>
          {step2.courseDestinations[activeDay]?.map((item, id) => (
            <CustomOverlayMap key={id} position={{ lat: item.location.latitude, lng: item.location.longitude }}>
              <div className={cx("marker-label")}>{id + 1}</div>
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
      <NavigationButtons />
    </>
  );
};

export default Step2;
