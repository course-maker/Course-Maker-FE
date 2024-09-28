import { IMAGES } from "./images";
import { PAGE_PATH } from "./pagePath";

export const MYPAGE_MENU_LIST = [
  { id: 1, icon: IMAGES.mypageMenuHeart, name: "찜", navigate: PAGE_PATH.myPageLikes },
  { id: 2, icon: IMAGES.mypageMenuLevel, name: "나의 등급", navigate: PAGE_PATH.myPageRank },
  { id: 3, icon: IMAGES.mypageMenuTravel, name: "내가 만든 여행", navigate: PAGE_PATH.myPageTrips },
];
