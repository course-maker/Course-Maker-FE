import { UserLevelInfo } from "@/type/type";
import { IMAGES } from "./images";

export const USER_LEVEL_INFO_LIST: UserLevelInfo[] = [
  {
    id: 1,
    level: "초보여행자",
    imgInfo: IMAGES.PartyIcon,
    requirement: {
      description: "코스메이커 회원가입 시",
    },
    benefits: {
      description: "여행지 등록/수정 요청 가능",
    },
  },
  {
    id: 2,
    level: "중급여행자",
    imgInfo: IMAGES.PartyIcon,
    requirement: {
      description: "리뷰 댓글 50개 작성 시",
    },
    benefits: {
      description: "코스 작성 가능",
    },
  },
  {
    id: 3,
    level: "프로여행자",
    imgInfo: IMAGES.PartyIcon,
    requirement: {
      description: "당월 작성된 게시글 중 조회수 1등, 찜수 1등, 좋아요 1등 코스/여행지 작성자",
      additionalInfo: "(매월 말일 기준으로 산정)",
    },
    benefits: {
      description: "여행지 방문 시 특별 혜택",
      additionalInfo: "(방문 시 로그인한 나의 등급 화면 제시 필요, 캡처한 이미지는 인정되지 않습니다.)",
    },
  },
];
