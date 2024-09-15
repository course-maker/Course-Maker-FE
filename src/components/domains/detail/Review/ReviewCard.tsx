import { CourseReview } from "@/api/course/type";
import EditAndDeleteButton from "@/components/commons/EditAndDeleteButton";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import ImageModal from "./ImageModal";
import styles from "./ReviewCard.module.scss";

const cx = classNames.bind(styles);

interface ReviewCardProps {
  review: CourseReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showToggleButton, setShowToggleButton] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const fullText = review.description;

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
        setShowToggleButton(isOverflowing);
      }
    };

    checkOverflow();
  }, [width, fullText]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <section className={cx("info")}>
          <div className={cx("info-nickname")}>{review.nickname}</div>
          <div className={cx("info-date")}>{review.reviewedAt ? review.reviewedAt : "2024.00.00"}</div>
          <div className={cx("info-like")}>
            <div className={cx("info-like-btn")}>
              {review.isMyCourseReview ? (
                <Image imageInfo={IMAGES.BlueFavoriteIcon} />
              ) : (
                <Image imageInfo={IMAGES.GrayFavoriteIcon} />
              )}
            </div>
            <span className={cx("info-like-count")}>{review.recommendCount ? review.recommendCount : 0}</span>
          </div>
        </section>
        <section className={cx("content")}>
          <div className={cx("content-header")}>
            <div className={cx("content-header-star")}>
              <div className={cx("content-header-star-icon")}>
                <Image imageInfo={IMAGES.BlackStarIcon} />
              </div>
              <span className={cx("content-header-star-rating")}>{review.rating}</span>
            </div>
            <EditAndDeleteButton onEdit={() => {}} onDelete={() => {}} />
          </div>
          <ul className={cx("content-images")}>
            {review.pictures.map((item, id) => (
              <div key={id} className={cx("content-images-image")} onClick={() => openModal(item)}>
                <img src={item} alt={`Preview ${id}`} />
              </div>
            ))}
          </ul>
          <div className={cx("content-text")}>
            <p
              ref={textRef}
              className={cx("content-text-text")}
              style={{
                whiteSpace: isExpanded ? "normal" : "nowrap",
              }}>
              {fullText}
            </p>
            {showToggleButton && (
              <button className={cx("content-text-btn")} onClick={toggleText}>
                {isExpanded ? "접기 ▲" : "더보기 ▼"}
              </button>
            )}
          </div>
        </section>
      </div>
      <ImageModal isOpen={isModalOpen} onCloseClick={closeModal} onKeyDown={handleKeyDown} image={modalImage} />
    </>
  );
};

export default ReviewCard;
