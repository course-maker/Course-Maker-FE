import { postCourseReviewRecommend, postCourseReviewUnrecommend } from "@/api/course";
import { CourseReview, PostCourseReviewRecommendResponseDto } from "@/api/course/type";
import { postDestinationReviewRecommend, postDestinationReviewUnrecommend } from "@/api/destination";
import { PostDestinationReviewRecommendResponseDto } from "@/api/destination/type";
import EditAndDeleteButton from "@/components/commons/EditAndDeleteButton";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import ImageModal from "./ImageModal";
import styles from "./ReviewCard.module.scss";

const cx = classNames.bind(styles);

type RecommendResponse = PostDestinationReviewRecommendResponseDto | PostCourseReviewRecommendResponseDto;

interface ReviewCardProps {
  type: "course" | "destination";
  review: CourseReview;
  onEditClick: (review: CourseReview) => void;
  onDeleteClick: (reviewId: number) => void;
}

const ReviewCard = ({ type, review, onEditClick, onDeleteClick }: ReviewCardProps) => {
  const { width } = useWindowSize();
  const { isAuth } = useAuth();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showToggleButton, setShowToggleButton] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [isRecommended, setIsRecommended] = useState<boolean>(review.isMyLikeReview);
  const [recommendCount, setRecommendCount] = useState<number>(review.recommendCount || 0);

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

  const postRecommendApi = () =>
    type === "course" ? postCourseReviewRecommend(review.reviewId) : postDestinationReviewRecommend(review.reviewId);

  const postUnrecommendApi = () =>
    type === "course"
      ? postCourseReviewUnrecommend(review.reviewId)
      : postDestinationReviewUnrecommend(review.reviewId);

  const postRecommendMutation = useMutation<RecommendResponse>({
    mutationFn: postRecommendApi,
    onSuccess: (data) => {
      setIsRecommended(data.isMyLikeReview);
      setRecommendCount(data.recommendCount);
    },
    onError: (error) => {
      console.error("Error updating recommendation status", error);
    },
  });

  const postUnrecommendMutation = useMutation<RecommendResponse>({
    mutationFn: postUnrecommendApi,
    onSuccess: (data) => {
      setIsRecommended(data.isMyLikeReview);
      setRecommendCount(data.recommendCount);
    },
    onError: (error) => {
      console.error("Error updating recommendation status", error);
    },
  });

  const handleRecommendToggle = () => {
    if (!isAuth) {
      alert("로그인 후 이용가능 합니다.");
      return;
    }

    if (isRecommended) {
      postUnrecommendMutation.mutate();
    } else {
      postRecommendMutation.mutate();
    }
  };

  useEffect(() => {
    setIsRecommended(review.isMyLikeReview);
    setRecommendCount(review.recommendCount || 0);
  }, [review.isMyLikeReview, review.recommendCount]);

  return (
    <>
      <div className={cx("container")}>
        <section className={cx("info")}>
          <div className={cx("info-nickname")}>{review.nickname}</div>
          <div className={cx("info-date")}>{review.reviewedAt}</div>
          <div className={cx("info-like")}>
            <div className={cx("info-like-btn")} onClick={handleRecommendToggle}>
              {isRecommended ? (
                <Image imageInfo={IMAGES.BlueFavoriteIcon} />
              ) : (
                <Image imageInfo={IMAGES.GrayFavoriteIcon} />
              )}
            </div>
            <span className={cx("info-like-count")}>{recommendCount}</span>
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
            {review.isMyCourseReview && (
              <EditAndDeleteButton
                onEdit={() => onEditClick(review)}
                onDelete={() => {
                  onDeleteClick(review.reviewId);
                }}
              />
            )}
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
