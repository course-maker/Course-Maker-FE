import React, { ReactNode } from "react";
import styles from "./TitleBox.module.scss";
import classNames from "classnames/bind";
// import Button from "../Button";
// import { IMAGES } from "@/constants/images";
// import Image from "../Image";

const cx = classNames.bind(styles);

interface ImageProps {
  src: string;
  alt: string;
}

interface CardProps {
  title: ReactNode;
  name: ReactNode;
  // rating: ReactNode;
  travelCount?: ReactNode;
  duration?: ReactNode;
  tags: string[];
  type: "course-detail" | "spot-detail";
  image: ImageProps;
}

const TitleBox: React.FC<CardProps> = ({ image, title, name, travelCount, duration, tags, type }) => {
  const isSpotDetail = type === "spot-detail";

  return (
    <div
      className={cx(styles.card, {
        [styles["spot-detail"]]: isSpotDetail,
      })}>
      <div>
        <img src={image.src} alt={image.alt} className={cx("image")} />
        <div className={cx("title-box")}>
          <h1 className={cx("title")}>{title}</h1>
          <div className={cx("rating", { [styles["spot-detail"]]: isSpotDetail })}>
            {/* <Button type="button" variant="third" color={"navy"}>
              <Image imageInfo={isSpotDetail ? IMAGES.blackStarIcon : IMAGES.starIcon} />
            </Button> */}
            {/* <p className={cx("rating-text")}>{rating}</p> */}
          </div>
        </div>
        <div className={cx("name")}>
          <p className={cx("text")}>작성자 {name}</p>
        </div>
      </div>
      <div className={cx("option", { [styles["hidden"]]: travelCount === null })}>
        <p className={cx("text")}>여행추천인원 {travelCount}</p>
        <p className={cx("text")}>여행기간 {duration}</p>
      </div>
      <div className={cx("tag-box")}>
        {tags?.map((tag, id) => (
          <span key={id} className={cx("tag-item", { [styles["spot-detail"]]: isSpotDetail })}>
            {tag}
          </span>
        ))}
      </div>
      {/* <div className={cx("icon-btn-group")}>
        <Button variant="primary" color="none">
          <Image imageInfo={isSpotDetail ? IMAGES.blackThumbsUpIcon : IMAGES.thumbsUpIcon} />
        </Button>
        <Button variant="primary" color="none">
          <Image imageInfo={isSpotDetail ? IMAGES.blackHeartIcon : IMAGES.heartIcon} />
        </Button>
        <Button variant="primary" color="none">
          <Image imageInfo={IMAGES.kakaoOauthButton} />
        </Button>
        <Button variant="primary" color="none">
          <Image imageInfo={IMAGES.linkCopyIcon} />
        </Button>
      </div> */}
    </div>
  );
};

export default TitleBox;
