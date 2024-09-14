import EditAndDeleteButton from "@/components/commons/EditAndDeleteButton";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import styles from "./ReviewCard.module.scss";

const cx = classNames.bind(styles);

const ReviewCard = () => {
  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const fullText =
    "긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 ";

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

  return (
    <div className={cx("container")}>
      <section className={cx("info")}>
        <div className={cx("info-nickname")}>{"작성자닉네임가가가가"}</div>
        <div className={cx("info-date")}>{"2024.09.14"}</div>
        <div className={cx("info-like")}>
          <div className={cx("info-like-btn")}>
            <Image imageInfo={IMAGES.GrayFavoriteIcon} />
          </div>
          <span className={cx("info-like-count")}>{89}</span>
        </div>
      </section>
      <section className={cx("content")}>
        <div className={cx("content-header")}>
          <div className={cx("content-header-star")}>
            <div className={cx("content-header-star-icon")}>
              <Image imageInfo={IMAGES.BlackStarIcon} />
            </div>
            <span className={cx("content-header-star-rating")}>{4}</span>
          </div>
          <EditAndDeleteButton onEdit={() => {}} onDelete={() => {}} />
        </div>
        <ul className={cx("content-images")}>
          {[
            "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/d2ebe00c-9749-441e-9540-6bf961ea62f6.png",
            "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/467f57ce-2267-47d0-8a2e-44b8eeae43c2.jpeg",
            "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/3babb647-e1ff-453b-9f81-9a24be943e91.jpg",
            "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/68698c2e-51d6-4e35-913e-82d26a0ffb6a.jpg",
            "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/68635088-f7a2-483b-b253-57958cd35956.jpg",
          ].map((item, id) => (
            <div key={id} className={cx("content-images-image")}>
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
  );
};

export default ReviewCard;
