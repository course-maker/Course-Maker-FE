// Step2.tsx
import React, { useEffect, useState } from "react";
import RegisterBadgeList from "@/components/commons/BadgeList/RegisterBadgeList/RegisterBadgeList";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import { step2State, step1State } from "@/recoil/stepsAtom";
import classNames from "classnames/bind";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./Step2.module.scss";
import { IMAGES } from "@/constants/images";
import Image from "@/components/commons/Image/index";
import { useQuery } from "@tanstack/react-query";
import { getDestination } from "@/api/destination";
import { Content, Root } from "@/api/destination/type";

const cx = classNames.bind(styles);

const Step2: React.FC = () => {
  const step1 = useRecoilValue(step1State);
  const [step2, setStep2] = useRecoilState(step2State);
  const [activeDay, setActiveDay] = useState(1);
  const [filteredData, setFilteredData] = useState<Content[]>([]);

  const { data: destinationData, refetch } = useQuery<Root>({
    queryKey: ["destinationData"],
    queryFn: () => getDestination({ currentPage: 1, totalPage: 1, pagingSlice: 1, contents: [] }),
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (destinationData) {
      const selectedDestinations = destinationData.contents.filter((content) =>
        content.tags.some((tag) => step1.selectedBadges.includes(tag.name)),
      );
      setFilteredData(selectedDestinations);
    }
  }, [destinationData, step1.selectedBadges]);

  const handleDestinationToggle = (destination: string) => {
    const destinations = step2.selectedDestinations.includes(destination)
      ? step2.selectedDestinations.filter((d) => d !== destination)
      : [...step2.selectedDestinations, destination];
    setStep2({ ...step2, selectedDestinations: destinations });
  };

  const mapCenter =
    filteredData.length > 0
      ? { lat: filteredData[0].location.latitude, lng: filteredData[0].location.longitude }
      : { lat: 37.5665, lng: 126.978 };

  return (
    <>
      <div>
        <p className={cx("path-title")}>경로설정</p>
      </div>
      <div className={cx("path-box")}>
        <div className={cx("BadgeList-box")}>
          {Object.entries(destinationData ?? {}).map(([title, badges]) => (
            <RegisterBadgeList
              key={title}
              title={title}
              badges={badges}
              selectedBadges={step2.selectedDestinations}
              toggleBadge={handleDestinationToggle}
            />
          ))}
        </div>
        <AllCardList>
          {filteredData.map((item, id) => (
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
              {step2.selectedDestinations.map((item, id) => (
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
          {filteredData.map((item, id) => (
            <div key={id}>
              <CustomOverlayMap position={{ lat: item.location.latitude, lng: item.location.longitude }}>
                <div className={cx("marker-label")}>{id + 1}</div>
              </CustomOverlayMap>
            </div>
          ))}
          <Polyline
            path={filteredData.map((item) => ({ lat: item.location.latitude, lng: item.location.longitude }))}
            strokeWeight={5}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeStyle="dash"
          />
        </Map>
      </div>
    </>
  );
};

export default Step2;
