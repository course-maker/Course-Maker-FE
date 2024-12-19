export const PAGE_PATH = {
  home: "/",
  signIn: "/signin",
  signUp: "/signup",
  search: "/search", // 나만의 여행찾기
  courseDetail: "/course/:id", // 코스 상세페이지
  destinationDetail: "/destination/:id", // 여행지 상세페이지
  courseRegister: "/course/register", // 코스 등록하기
  destinationRegister: "/destination/register", // 여행지 등록하기
  courseEdit: "/course/:id/edit", // 코스 수정하기
  destinationEdit: "/destination/:id/edit", // 여행지 수정하기
  myPage: "/mypage", // 마이페이지
  myPageUserInfo: "/mypage/userInfo", // 마이페이지 회원 정보 변경
  myPageRank: "/mypage/rank", // 마이페이지 나의 등급/뱃지
  myPageTrips: "/mypage/trips", // 마이페이지 내가 만든 여행
  myPageLikes: "/mypage/likes", // 마이페이지 찜
  myPageReview: "/mypage/review", // 마이페이지 내가 쓴 리뷰
  myPageDelete: "/mypage/delete", // 마이페이지 회원 탈퇴
  authKakao: "/auth/kakao/callback",
};

const { signIn, signUp, courseRegister, destinationRegister } = PAGE_PATH;

export const authPages = [signIn, signUp];
export const registerPages = [courseRegister, destinationRegister];
export const dynamicPages = [/\/course\/[^/]+\/edit/, /\/destination\/[^/]+\/edit/];
