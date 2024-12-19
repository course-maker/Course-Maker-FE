import { IMAGES } from "./images";
import { PAGE_PATH } from "./pagePath";

export const MYPAGE_MENU_LIST = [
  { id: 1, icon: IMAGES.mypageMenuUserInfo, name: "회원 정보 변경", navigate: PAGE_PATH.myPageUserInfo },
  { id: 2, icon: IMAGES.mypageMenuLevel, name: "내 등급/뱃지", navigate: PAGE_PATH.myPageRank },
  { id: 3, icon: IMAGES.mypageMenuTravel, name: "내가 만든 여행", navigate: PAGE_PATH.myPageTrips },
  { id: 4, icon: IMAGES.mypageMenuHeart, name: "찜", navigate: PAGE_PATH.myPageLikes },
  { id: 5, icon: IMAGES.mypageMenuReview, name: "내가 쓴 리뷰", navigate: PAGE_PATH.myPageReview },
  { id: 6, icon: IMAGES.mypageMenuDelete, name: "회원 탈퇴", navigate: PAGE_PATH.myPageDelete },
];
