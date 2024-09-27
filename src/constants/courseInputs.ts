import BadgeListsController from "@/components/commons/BadgeListsController";
import MainImageInputController from "@/components/commons/MainImageInputController/MainImageInputController";
import QuillEditorController from "@/components/commons/QuillEditorController";
import TitleInputController from "@/components/domains/destinationRegister/TitleInputController";
import OptionController from "@/components/domains/courseRegister/OptionController";
import DestinationsInputController from "@/components/domains/courseRegister/DestinationsInputController";

export const INPUTS = {
  title: {
    label: "코스 이름",
    message: "코스 이름은 30글자까지 입력 가능합니다.",
    isEssential: true,
    component: TitleInputController,
  },
  duration: {
    label: "여행 기간",
    message: "여행 기간을 선택해주세요.",
    isEssential: true,
    component: OptionController,
  },
  travelerCount: {
    label: "여행 추천 인원",
    message: "여행 추천 인원을 선택해주세요.",
    isEssential: true,
    component: OptionController,
  },
  courseDestinations: {
    label: "경로 설정",
    message: "코스 경로를 설정해주세요!",
    isEssential: true,
    component: DestinationsInputController,
  },
  pictureLink: {
    label: "대표 이미지",
    message: "대표 이미지는 1개, 15MB 이하입니다.",
    isEssential: true,
    component: MainImageInputController,
  },
  tags: {
    label: "코스 태그 선택",
    message: "코스에 적합한 태그를 1개 이상, 5개 이하로 선택해 주세요!",
    isEssential: true,
    component: BadgeListsController,
  },
  content: {
    label: "코스 설명",
    message: "코스에 대해 설명해 주세요!",
    isEssential: true,
    component: QuillEditorController,
    placeholder: "코스를 소개해주세요!",
  },
};

export const API_INPUTS = {
  title: {
    label: "코스 이름",
    message: "한국관광공사에서 제공하는 여행지 정보는 여행지 이름 수정이 불가합니다.",
    isEssential: false,
    component: TitleInputController,
  },
  duration: {
    label: "여행 기간",
    message: "여행 기간을 선택해주세요.",
    isEssential: true,
    component: TitleInputController,
  },
  travelerCount: {
    label: "여행 추천 인원",
    message: "여행 추천 인원을 선택해주세요.",
    isEssential: true,
    component: TitleInputController,
  },
  courseDestinations: {
    label: "경로 설정",
    message: "코스 경로를 설정해주세요!",
    isEssential: true,
    component: DestinationsInputController,
  },
  pictureLink: {
    label: "대표 이미지",
    message: "한국관광공사에서 제공하는 여행지 정보는 대표 이미지 수정이 불가합니다.",
    isEssential: false,
    component: MainImageInputController,
  },
  tags: {
    label: "코스 태그 선택",
    message: "코스에 적합한 태그를 1개 이상, 5개 이하로 선택해 주세요!",
    isEssential: true,
    component: BadgeListsController,
  },
  content: {
    label: "코스 설명",
    message: "코스에 대해 설명해 주세요!",
    isEssential: true,
    component: QuillEditorController,
    placeholder: "코스를 소개해주세요!",
  },
};
