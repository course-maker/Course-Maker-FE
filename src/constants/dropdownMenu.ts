export interface DropdownMenu {
  [key: string]: { option: string; value: string };
}

export const EMAIL_DOMAIN_DROPDOWN = {
  custom: {
    option: "직접입력",
    value: "",
  },
  daum: {
    option: "daum.net",
    value: "daum.net",
  },
  google: {
    option: "google.com",
    value: "google.com",
  },
  kakao: {
    option: "kakao.com",
    value: "kakao.com",
  },
  nate: {
    option: "nate.com",
    value: "nate.com",
  },
  naver: {
    option: "naver.com",
    value: "naver.com",
  },
};
