import { IMAGES } from "./images";
import { PAGE_PATH } from "./pagePath";

export const NAVIGATION_BAR_MENU = {
  home: {
    title: "홈",
    tabTitle: "홈",
    path: PAGE_PATH.home,
    icon: IMAGES.BlackHomeIcon,
  },
  search: {
    title: "나만의 여행찾기",
    tabTitle: "검색",
    path: PAGE_PATH.search,
    icon: IMAGES.BlackSearchIcon,
  },
  courseRegister: {
    title: "코스 등록하기",
    tabTitle: "코스",
    path: PAGE_PATH.courseRegister,
    icon: IMAGES.BlackMapIcon,
  },
  destinationRegister: {
    title: "여행지 등록하기",
    tabTitle: "여행지",
    path: PAGE_PATH.destinationRegister,
    icon: IMAGES.BlackPointerIcon,
  },
};
