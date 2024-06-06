export interface SignField {
  label?: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  defaultMessage?: string;
}

export const SIGN_IN_CONDITION = {
  loginEmail: {
    label: undefined,
    type: "text",
    placeholder: "이메일을 입력하세요.",
    maxLength: undefined,
    defaultMessage: undefined,
  },
  password: {
    label: undefined,
    type: "password",
    placeholder: "비밀번호를 입력하세요.",
    maxLength: 15,
    defaultMessage: undefined,
  },
};

export const SIGN_UP_EMAIL_CONDITION = {
  email: {
    label: "이메일",
    type: "text",
    placeholder: "이메일을 입력하세요.",
    maxLength: undefined,
    defaultMessage: undefined,
  },
};

export const SIGN_UP_CONDITION = {
  password: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요.",
    maxLength: 15,
    defaultMessage: "영어 소문자, 숫자, 특수문자 조합 8자 이상 입력해주세요.",
  },
  confirmPassword: {
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요.",
    maxLength: 15,
    defaultMessage: undefined,
  },
  name: {
    label: "이름",
    type: "text",
    placeholder: "이름을 입력하세요.",
    maxLength: 10,
    defaultMessage: "이름은 2~10글자의 한글만 입력 가능합니다.",
  },
  nickname: {
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력하세요.",
    maxLength: 10,
    defaultMessage: "닉네임은 한글, 영어 소문자, 숫자만 이용가능합니다.",
  },
  phoneNumber: {
    label: "휴대폰 번호",
    type: "tel",
    placeholder: "휴대폰 번호를 입력하세요.",
    maxLength: 13,
    defaultMessage: "휴대폰 번호는 숫자만 입력 가능합니다.",
  },
};
