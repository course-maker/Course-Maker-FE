import { getCourseReviews } from "@/api/course";
import { getCourseReviewsResponseDto } from "@/api/course/type";
import { getDestinationReviews } from "@/api/destination";
import { getDestinationReviewsResponseDto } from "@/api/destination/type";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./InfoAndReviewTab.module.scss";

const cx = classNames.bind(styles);

type ReviewsResponse = getCourseReviewsResponseDto | getDestinationReviewsResponseDto;
interface InfoAndReviewTabProps {
  type: "course" | "destination";
  info: ReactNode;
}

const InfoAndReviewTab = ({ type, info }: InfoAndReviewTabProps) => {
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
      {tab === "info" ? <article>{info}</article> : <article>리뷰</article>}
    </>
  );
};
export default InfoAndReviewTab;
