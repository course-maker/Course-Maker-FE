import Delete from "@/components/domains/myPage/contents/Delete";
import Level from "@/components/domains/myPage/contents/Level";
import Likes from "@/components/domains/myPage/contents/Likes";
import Reviews from "@/components/domains/myPage/contents/Reviews";
import Trips from "@/components/domains/myPage/contents/Trips";
import UpdateUserInfo from "@/components/domains/myPage/contents/UpdateUserInfo";
import { IMAGES } from "./images";
import { PAGE_PATH } from "./pagePath";

export const MYPAGE_MENU_LIST = [
  {
    id: 1,
    icon: IMAGES.mypageMenuUpdateUserInfo,
    name: "회원 정보 변경",
    navigate: PAGE_PATH.myPageUpdateUserInfo,
    content: UpdateUserInfo,
  },
  { id: 2, icon: IMAGES.mypageMenuLevel, name: "내 등급/뱃지", navigate: PAGE_PATH.myPageRank, content: Level },
  { id: 3, icon: IMAGES.mypageMenuTravel, name: "내가 만든 여행", navigate: PAGE_PATH.myPageTrips, content: Trips },
  { id: 4, icon: IMAGES.mypageMenuHeart, name: "찜", navigate: PAGE_PATH.myPageLikes, content: Likes },
  { id: 5, icon: IMAGES.mypageMenuReview, name: "내가 쓴 리뷰", navigate: PAGE_PATH.myPageReview, content: Reviews },
  { id: 6, icon: IMAGES.mypageMenuDelete, name: "회원 탈퇴", navigate: PAGE_PATH.myPageDelete, content: Delete },
];
