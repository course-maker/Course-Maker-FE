import { getCourseReviews } from "@/api/course";
import { GetCourseReviewsResponseDto } from "@/api/course/type";
import { getDestinationReviews } from "@/api/destination";
import { GetDestinationReviewsResponseDto } from "@/api/destination/type";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./InfoAndReviewTab.module.scss";

const cx = classNames.bind(styles);

type ReviewsResponse = GetCourseReviewsResponseDto | GetDestinationReviewsResponseDto;
interface InfoAndReviewTabProps {
  type: "course" | "destination";
  info: ReactNode;
  review: ReactNode;
}

const InfoAndReviewTab = ({ type, info, review }: InfoAndReviewTabProps) => {
  const { id } = useParams();
  const postId = Number(id);
  const [tab, setTab] = useState<string>("info");

  const handleInfoClick = () => {
    setTab("info");
  };

  const handleReviewClick = () => {
    setTab("review");
  };

  const { data } = useQuery<ReviewsResponse>({
    queryKey: type === "course" ? ["courseReview", postId] : ["destinationReview", postId],
    queryFn: () =>
      type === "course" ? getCourseReviews({ courseId: postId }) : getDestinationReviews({ courseId: postId }),
  });

  const totalReviewCount = data?.totalContents;

  return (
    <>
      <div className={cx("tabs")}>
        <button className={cx("tabs-btn", { isSelected: tab === "info" })} onClick={handleInfoClick}>
          {type === "course" ? "코스" : "여행지"} 안내
        </button>
        <button className={cx("tabs-btn", { isSelected: tab === "review" })} onClick={handleReviewClick}>
          리뷰({totalReviewCount}개)
        </button>
      </div>
      {tab === "info" ? (
        <section className={cx("section")}>{info}</section>
      ) : (
        <section className={cx("section")}>{review}</section>
      )}
    </>
  );
};
export default InfoAndReviewTab;
