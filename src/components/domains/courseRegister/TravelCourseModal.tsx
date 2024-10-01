import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";

import BadgeLists from "@/components/commons/BadgeLists/BadgeLists";
import Button from "@/components/commons/Button";
import Image from "@/components/commons/Image";
import Modal from "@/components/commons/Modal";

import { CourseDestination } from "@/api/course/type";
import { getDestinationResponseDto, GetDestinationsResponseDto } from "@/api/destination/type";
import { tagResponseDto } from "@/api/tag/type";
import { IMAGES } from "@/constants/images";
import { useGetDestinationQuery } from "@/hooks/destination/queries/useGetDestinationQuery";

import classNames from "classnames/bind";
import styles from "./TravelCourseOnMap.module.scss";
const cx = classNames.bind(styles);

interface TravelCourseModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  selectedDate: number;
  selectedDestinations: CourseDestination[];
  handleDestinationToggle: (destination: getDestinationResponseDto) => void;
  handleBadgeChange: (badges: tagResponseDto[]) => void;
  selectedBadges: tagResponseDto[];
}

const TravelCourseModal = ({
  isModalOpen,
  handleCloseModal,
  selectedDate,
  selectedDestinations,
  handleDestinationToggle,
  handleBadgeChange,
  selectedBadges,
}: TravelCourseModalProps) => {
  const {
    data: destinationData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading: isDestinationLoading,
  }: UseInfiniteQueryResult<InfiniteData<GetDestinationsResponseDto, unknown>, Error> = useGetDestinationQuery(
    selectedBadges,
  );

  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerElem.current) observer.observe(observerElem.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allDestinationData: getDestinationResponseDto[] = destinationData?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <Modal isOpen={isModalOpen} onBackdropClick={handleCloseModal}>
      <div className={cx("modal-content")}>
        <div className={cx("txt-container")}>
          <div className={cx("txt-title")}>DAY {selectedDate} 경로 설정</div>
          <span className={cx("txt-sub")}>여행지는 1일당 15개까지 추가 가능합니다.</span>
        </div>

        <div className={cx("path-box")}>
          <div className={cx("BadgeList-box")}>
            <BadgeLists selectedBadges={selectedBadges} onChange={handleBadgeChange} />
          </div>
          <div>
            <div className={cx("destination-section")}>
              <div className={cx("destination-section__header")}>
                <p className={cx("txt-sub")}>추가한 순서대로 경로가 설정됩니다.</p>
              </div>
            </div>
            {!isDestinationLoading ? (
              <div className={cx("destination-section__cards")}>
                {allDestinationData.map((item) => (
                  <div className={cx("item-container")} key={item.id}>
                    <button type="button" className={cx("plus-btn")} onClick={() => handleDestinationToggle(item)}>
                      {selectedDestinations.some((d) => d.destination.id === item.id) ? (
                        <Image className={cx("img")} imageInfo={IMAGES.check} />
                      ) : (
                        <Image className={cx("img")} imageInfo={IMAGES.plus} />
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
                <div ref={observerElem} style={{ height: "1px" }} />
              </div>
            ) : (
              <div className={cx("destination-section__cards")}>
                {Array.from({ length: 4 }).map((_, id) => (
                  <div className={cx("item-container")} key={id}>
                    <button type="button" className={cx("plus-btn")}>
                      <Image className={cx("img")} imageInfo={IMAGES.plus} />
                    </button>
                    <div>
                      <Skeleton className={cx("item-image")} height="9.5911rem" width="12.64rem" />
                    </div>
                    <div className={cx("item-box")}>
                      <div className={cx("title-group")}>
                        <Skeleton className={cx("item-title")} count={3} height="1rem" width="70%" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button color="blue" variant="secondary" size="large" onClick={handleCloseModal}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default TravelCourseModal;
