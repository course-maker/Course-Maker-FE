import { IMAGES } from "@/constants/images";

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
    id: 0,
    name: "부산 아쿠아리움",
    location: "부산 해운대구 해운대해변로 266",
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
    id: 1,
    name: "해운대",
    location: "부산 해운대구 해운대해변로 280",
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
    id: 2,
    name: "부산 영도",
    location: "부산 해운대구 해운대해변로 299",
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
    id: 3,
    name: "부산 광안리",
    location: "부산 해운대구 해운대해변로 388",
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
    },
    {
      id: 1,
      image: IMAGES.CultureIcon,
      title: "문화/유적지",
      size: "small",
    },
    {
      id: 2,
      image: IMAGES.CoupleIcon,
      title: "커플여행",
      size: "small",
    },
    {
      id: 3,
      image: IMAGES.PetIcon,
      title: "애견동반",
      size: "small",
    },
    {
      id: 4,
      image: IMAGES.PartyIcon,
      title: "축제",
      size: "small",
    },
    {
      id: 5,
      image: IMAGES.PicnicIcon,
      title: "식도락",
      size: "small",
    },
  ],
  large: [
    {
      id: 0,
      image: IMAGES.Home_left_test.src,
      subtitle: "스카이캡슐",
      title: "바다를 따라 다니며\n육지와는 다른 풍경을 즐기세요",
      size: "large",
      url: "destination/27",
    },
    {
      id: 1,
      image: IMAGES.Home_right_test.src,
      subtitle: "부산 필수코스",
      title: "부산이 처음이라면\n여기부터 가보셔야죠",
      size: "large",
      url: "course/21",
    },
  ],
};
