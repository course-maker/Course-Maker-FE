import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./Step2.module.scss";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { AllCardList, FilterCardList } from "@/components/commons/CardList/CardList";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";
import { getDestination } from "@/api/destination";
import { GetDestinationDto } from "@/api/destination/type";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { useStepper } from "../../StepperContext";
import BadgeListsController from "@/components/domains/courseRegister/BadgeListsController";
import { FaMinusCircle } from "react-icons/fa";

const cx = classNames.bind(styles);

interface Step2Form {
  tags: { id: number; name: string; description: string }[];
}

interface Step2Data {
  courseDestinations: Record<number, GetDestinationDto[]>;
  tags?: { id: number; name: string; description: string }[];
}

const Step2: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<Step2Form>({
    defaultValues: {
      tags: [],
    },
  });
  const [activeDay, setActiveDay] = useState<number>(1);
  const [allDestinations, setAllDestinations] = useState<GetDestinationDto[]>([]);
  const [filteredData, setFilteredData] = useState<GetDestinationDto[]>([]);
  const [step1Data, setStep1Data] = useState<any>(null);
  const [step2Data, setStep2Data] = useState<Step2Data>({ courseDestinations: {} });

  const { data: destinationData, isSuccess } = useQuery({
    queryKey: ["destinationData"],
    queryFn: () => getDestination({ pagingSlice: 20, totalPage: 1, currentPage: 1, contents: [] }),
  });

  useEffect(() => {
    const savedStep1 = getFromLocalStorage("step1");
    const savedStep2 = getFromLocalStorage("step2");
    if (savedStep1) {
      setStep1Data(savedStep1);
    }
    if (savedStep2) {
      setStep2Data(savedStep2);
      setValue("tags", savedStep2.tags || []);
    }
    if (isSuccess && destinationData) {
      setAllDestinations(destinationData.contents);
      setFilteredData(destinationData.contents);
    }
  }, [isSuccess, destinationData, setValue]);

  const tags = watch("tags");

  useEffect(() => {
    filterDestinationsByTags(tags);
  }, [tags, allDestinations]);

  const filterDestinationsByTags = (tags: { id: number; name: string; description: string }[]) => {
    if (!tags || tags.length === 0) {
      setFilteredData(allDestinations);
    } else {
      const tagNames = tags.map((tag) => tag.name);
      const filtered = allDestinations.filter((destination) =>
        destination.tags.some((tag) => tagNames.includes(tag.name)),
      );
      setFilteredData(filtered);
    }
  };

  const handleDestinationToggle = (destinationName: string) => {
    const destination = allDestinations.find((d) => d.name === destinationName);
    if (!destination) return;
    const updatedDestinations = step2Data.courseDestinations[activeDay]
      ? [...step2Data.courseDestinations[activeDay]]
      : [];
    const destinationIndex = updatedDestinations.findIndex((d) => d.id === destination.id);

    if (destinationIndex === -1) {
      updatedDestinations.push(destination);
    } else {
      updatedDestinations.splice(destinationIndex, 1);
    }

    const updatedStep2Data = {
      ...step2Data,
      courseDestinations: {
        ...step2Data.courseDestinations,
        [activeDay]: updatedDestinations,
      },
    };

    setStep2Data(updatedStep2Data);
  };

  const mapCenter =
    step2Data.courseDestinations[activeDay] && step2Data.courseDestinations[activeDay].length > 0
      ? {
          lat: step2Data.courseDestinations[activeDay][0].location.latitude,
          lng: step2Data.courseDestinations[activeDay][0].location.longitude,
        }
      : { lat: 35.1795543, lng: 129.0756416 };

  const polylinePath =
    step2Data.courseDestinations[activeDay]?.map((item) => ({
      lat: item.location.latitude,
      lng: item.location.longitude,
    })) || [];

  const { goToNextStep, goToPrevStep } = useStepper();

  const handleNext: SubmitHandler<Step2Form> = () => {
    const allDaysHaveDestinations = Array.from(
      { length: step1Data?.duration || 0 },
      (_, index) => step2Data.courseDestinations[index + 1],
    ).every((destinations) => destinations && destinations.length > 0);

    if (!allDaysHaveDestinations) {
      alert("모든 DAY에 최소 한 개의 여행지를 추가해주세요.");
      return;
    }

    const updatedStep2Data: Step2Data = {
      ...step2Data,
    };

    if (tags.length > 0) {
      updatedStep2Data.tags = tags;
    }

    setStep2Data(updatedStep2Data);
    saveToLocalStorage("step2", updatedStep2Data);
    goToNextStep();
  };

  const handlePrev = () => {
    const savedStep2 = getFromLocalStorage("step2");
    if (savedStep2) {
      setStep2Data(savedStep2);
      setValue("tags", savedStep2.tags || []);
    }
    goToPrevStep();
  };

  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <div className={cx("path-title-box")}>
        <p className={cx("path-title")}>경로 설정</p>
      </div>
      <div className={cx("path-box")}>
        <div className={cx("BadgeList-box")}>
          <BadgeListsController formFieldName="tags" control={control} />
        </div>
        <AllCardList>
          {filteredData.map((item, id) => (
            <div className={cx("item-container")} key={id}>
              <button type="button" className={cx("plus-btn")} onClick={() => handleDestinationToggle(item.name)}>
                {step2Data.courseDestinations[activeDay]?.some((d) => d.name === item.name) ? (
                  <FaMinusCircle className={cx("minus-btn")} />
                ) : (
                  <Image imageInfo={IMAGES.plus} />
                )}
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
            {[...Array(step1Data?.duration || 0)].map((_, index) => (
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
              {step2Data.courseDestinations[activeDay]?.map((item, id) => (
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
        <Map center={mapCenter} className={cx("kakao-map")} style={{ width: "60rem", height: "80rem" }} level={6}>
          {step2Data.courseDestinations[activeDay]?.map((item, id) => (
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
      <div className={cx("btn-group")}>
        <NavigationButtons onClickNext={handleSubmit(handleNext)} onClickPrev={handlePrev} />
      </div>
    </form>
  );
};

export default Step2;
