import { addCourseLike, addCourseWish, deleteCourseLike, deleteCourseWish } from "@/api/course";
import { Course } from "@/api/course/type";
import {
  addDestinationLike,
  addDestinationWish,
  deleteDestinationLike,
  deleteDestinationWish,
} from "@/api/destination";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import styles from "./DetailActionButtons.module.scss";

const cx = classNames.bind(styles);

interface DetailActionButtonsProps {
  type: "course" | "destination";
  data: Course;
  initialLiked: boolean;
  initialWished: boolean;
}

const DetailActionButtons = ({ type, data, initialLiked, initialWished }: DetailActionButtonsProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isWished, setIsWished] = useState(initialWished);
  const { isAuth } = useAuth();
  const { shareMessage, isKakaoInitialized } = useKakaoShare();
  const showToast = useToast();

  const addLikeApi = () =>
    type === "course" ? addCourseLike({ courseId: data.id }) : addDestinationLike({ destinationId: data.id });
  const deleteLikeApi = () => (type === "course" ? deleteCourseLike(data.id) : deleteDestinationLike(data.id));

  const postLikeMutation = useMutation({
    mutationFn: addLikeApi,
    onError: (error) => {
      console.error("Error updating like status", error);
      setIsLiked((prev) => !prev);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: deleteLikeApi,
    onError: (error) => {
      console.error("Error updating like status", error);
      setIsLiked((prev) => !prev);
    },
  });

  const addWishApi = () =>
    type === "course" ? addCourseWish({ courseId: data.id }) : addDestinationWish({ destinationId: data.id });

  const deleteWishApi = () => (type === "course" ? deleteCourseWish(data.id) : deleteDestinationWish(data.id));

  const postWishMutation = useMutation({
    mutationFn: addWishApi,
    onError: (error) => {
      console.error("Error updating like status", error);
      setIsWished((prev) => !prev);
    },
  });

  const deleteWishMutation = useMutation({
    mutationFn: deleteWishApi,
    onError: (error) => {
      console.error("Error updating like status", error);
      setIsWished((prev) => !prev);
    },
  });

  const handleLikeToggle = () => {
    if (!isAuth) {
      alert("로그인 후 이용가능 합니다.");
      return;
    }

    setIsLiked((prev) => !prev);

    if (isLiked) {
      deleteLikeMutation.mutate();
    } else {
      postLikeMutation.mutate();
    }
  };

  const handleWishToggle = () => {
    if (!isAuth) {
      alert("로그인 후 이용가능 합니다.");
      return;
    }

    setIsWished((prev) => !prev);

    if (isWished) {
      deleteWishMutation.mutate();
    } else {
      postWishMutation.mutate();
    }
  };

  const handleKaKaoShare = () => {
    if (isKakaoInitialized) {
      shareMessage({
        id: data.id,
        title: data.title,
        description: data.content,
        imageUrl: data.pictureLink,
        pageType: type,
      });
    } else {
      console.error("Kakao SDK가 아직 초기화되지 않았습니다.");
    }
  };

  const handleLinkCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast("링크가 복사되었습니다.", "success");
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
      showToast("링크 복사에 실패했습니다. 다시 시도해주세요.", "error");
    }
  };

  const buttonData = [
    { onClick: handleLikeToggle, image: isLiked ? IMAGES.BlueFavoriteIcon : IMAGES.GrayFavoriteIcon },
    { onClick: handleWishToggle, image: isWished ? IMAGES.BlueBookmarkIcon : IMAGES.GrayBookmarkIcon },
    { onClick: handleKaKaoShare, image: IMAGES.GrayKaKaoIcon },
    { onClick: handleLinkCopy, image: IMAGES.GrayLinkIcon },
  ];

  return (
    <>
      {buttonData.map((button, index) => (
        <button key={index} onClick={button.onClick} className={cx("action-btn")}>
          <Image imageInfo={button.image} />
        </button>
      ))}
      <ToastContainer limit={3} />
    </>
  );
};
export default DetailActionButtons;
