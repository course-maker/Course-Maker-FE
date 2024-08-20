import BadgeListsController from "@/components/commons/BadgeListsController";
import MainImageInputController from "@/components/commons/MainImageInputController/MainImageInputController";
import QuillEditorController from "@/components/commons/QuillEditorController";
import AddressSearchInputController from "@/components/domains/destinationRegister/AddressSearchInputController";
import TitleInputController from "@/components/domains/destinationRegister/TitleInputController";

// fix: label, message string constants로 정리하기
export const INPUTS = {
  name: {
    label: "여행지 이름",
    message: "여행지 이름은 30글자까지 입력 가능합니다.",
    isEssential: true,
    component: TitleInputController,
  },
  location: {
    label: "여행지 위치",
    message: "여행지 위치를 입력해 주세요!",
    isEssential: true,
    component: AddressSearchInputController,
  },
  pictureLink: {
    label: "대표 이미지",
    message: "대표 이미지는 1개, 15MB 이하입니다.",
    isEssential: true,
    component: MainImageInputController,
  },
  tags: {
    label: "여행지 태그 선택",
    message: "여행지에 적합한 태그를 1개 이상, 5개 이하로 선택해 주세요!",
    isEssential: true,
    component: BadgeListsController,
  },
  content: {
    label: "여행지 설명",
    message: "여행지에 대해 설명해 주세요!",
    isEssential: true,
    component: QuillEditorController,
    placeholder: "여행지를 소개해주세요!",
  },
};

export const API_INPUTS = {
  name: {
    label: "여행지 이름",
    message: "한국관광공사에서 제공하는 여행지 정보는 여행지 이름 수정이 불가합니다.",
    isEssential: false,
    component: TitleInputController,
    disabled: true,
  },
  location: {
    label: "여행지 위치",
    message: "한국관광공사에서 제공하는 여행지 정보는 여행지 위치 수정이 불가합니다.",
    isEssential: false,
    component: AddressSearchInputController,
    disabled: true,
  },
  pictureLink: {
    label: "대표 이미지",
    message: "한국관광공사에서 제공하는 여행지 정보는 대표 이미지 수정이 불가합니다.",
    isEssential: false,
    component: MainImageInputController,
    disabled: true,
  },
  tags: {
    label: "여행지 태그 선택",
    message: "여행지에 적합한 태그를 1개 이상, 5개 이하로 선택해 주세요!",
    isEssential: true,
    component: BadgeListsController,
  },
  content: {
    label: "여행지 설명",
    message: "여행지에 대해 설명해 주세요!",
    isEssential: true,
    component: QuillEditorController,
    placeholder: "여행지를 소개해주세요!",
  },
};
