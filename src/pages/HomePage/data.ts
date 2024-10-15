import { IMAGES } from "@/constants/images";

export const LikeMockData = [
  { id: 0, url: "http://tong.visitkorea.or.kr/cms/resource/37/3029337_image2_1.jpg" },
  { id: 1, url: "http://tong.visitkorea.or.kr/cms/resource/90/2795790_image2_1.jpg" },
  { id: 2, url: "http://tong.visitkorea.or.kr/cms/resource/82/3345882_image2_1.jpg" },
  { id: 3, url: "http://tong.visitkorea.or.kr/cms/resource/71/2795871_image2_1.jpg" },
];

export const bannerData = [
  {
    id: 0,
    image: IMAGES.Banner2.src,
    size: "x-large",
    title: "null",
  },
  {
    id: 1,
    image: IMAGES.Banner3.src,
    size: "x-large",
  },
  {
    id: 2,
    image: IMAGES.Banner4.src,
    size: "x-large",
  },
];

export const busanData = [
  {
    id: 36,
    name: "잊지 못할 부산/n즐거움이 가득한",
    location: "체험학습 추천 코스",
    image: "http://tong.visitkorea.or.kr/cms/resource/37/2781837_image2_1.jpg",
    icons: {
      calendar: 22,
      member: 27,
      blackStar: 12,
    },
    tags: [
      { id: 0, name: "자연", description: "바다" },
      { id: 1, name: "날씨", description: "실내공간" },
    ],
  },
  {
    id: 37,
    name: "부산의 숨은 명소/n쉬면서 즐기는",
    location: "피크닉 투어",
    image: "http://tong.visitkorea.or.kr/cms/resource/52/2961452_image2_1.jpeg",
    icons: {
      calendar: 102,
      member: 21,
      blackStar: 222,
    },
    tags: [
      { id: 0, name: "자연", description: "바다" },
      { id: 1, name: "동행", description: "유아동반" },
    ],
  },
  {
    id: 23,
    name: "마음이 평화로워지는/n역사 탐방",
    location: "박물관 여행",
    image: "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/28a8d5d2-98a1-4b2d-adc3-a45d302f1259.jfif",
    icons: {
      calendar: 2,
      member: 2,
      blackStar: 2,
    },
    tags: [
      { id: 0, name: "자연", description: "바다" },
      { id: 1, name: "자연", description: "둘레길" },
    ],
  },
  {
    id: 34,
    name: "가슴이 뻥뚫리는/n바다 위를 건너가는",
    location: "바다사진 촬영스팟",
    image: "	http://tong.visitkorea.or.kr/cms/resource/48/2832648_image2_1.jpg",
    icons: {
      calendar: 72,
      member: 827,
      blackStar: 1332,
    },
    tags: [
      { id: 0, name: "자연", description: "바다" },
      { id: 1, name: "음식", description: "전통시장" },
    ],
  },
];

export const bannerItemsData = {
  small: [
    {
      id: 0,
      image: IMAGES.ChildIcon,
      title: "유아동반",
      size: "small",
      tag: { id: 7, name: "유아동반", description: "동행" },
    },
    {
      id: 1,
      image: IMAGES.CultureIcon,
      title: "문화/유적지",
      size: "small",
      tag: { id: 15, name: "문화/박물관", description: "활동" },
    },
    {
      id: 2,
      image: IMAGES.CoupleIcon,
      title: "커플여행",
      size: "small",
      tag: { id: 11, name: "연인/배우자", description: "동행" },
    },
    {
      id: 3,
      image: IMAGES.PetIcon,
      title: "애견동반",
      size: "small",
      tag: { id: 13, name: "애견동반", description: "동행" },
    },
    {
      id: 4,
      image: IMAGES.PartyIcon,
      title: "축제",
      size: "small",
      tag: { id: 16, name: "축제/공연", description: "활동" },
    },
    {
      id: 5,
      image: IMAGES.PicnicIcon,
      title: "식도락",
      size: "small",
      tag: { id: 21, name: "식도락", description: "활동" },
    },
  ],
  large: [
    {
      id: 0,
      image: {
        small: IMAGES.Home_left_small.src,
        medium: IMAGES.Home_left_medium.src,
        large: IMAGES.Home_left_large.src,
      },
      subtitle: "해운대 그린레일웨이",
      title: "바다를 따라 다니며\n육지와는 다른 풍경을 즐기세요",
      size: "large",
      url: "destination/1092",
    },
    {
      id: 1,
      image: {
        small: IMAGES.Home_right_small.src,
        medium: IMAGES.Home_right_medium.src,
        large: IMAGES.Home_right_large.src,
      },
      subtitle: "부산 필수코스",
      title: "부산이 처음이라면\n여기부터 가보셔야죠",
      size: "large",
      url: "course/38",
    },
  ],
};
