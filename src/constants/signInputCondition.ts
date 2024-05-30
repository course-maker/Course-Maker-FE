interface SignInConditionType {
  [key: string]: {
    label: string;
    type: string;
    placeholder: string;
    rules: {
      required: string;
      pattern?: { value: RegExp; message: string };
      maxLength?: { value: number; message: string };
    };
    helperText: string;
    maxLength?: number;
  };
}

export const SIGN_IN_CONDITION: SignInConditionType = {
  id: {
    label: "",
    type: "text",
    placeholder: "이메일을 입력하세요.",
    rules: {
      required: "이메일을 입력해주세요.",
      pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 주소가 아닙니다." },
    },
    helperText: "",
  },
  password: {
    label: "",
    type: "password",
    placeholder: "비밀번호를 입력하세요.",
    rules: { required: "비밀번호를 입력해주세요." },
    helperText: "",
    maxLength: 15,
  },
};
