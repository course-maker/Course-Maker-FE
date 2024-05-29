interface SignInConditionType {
  [key: string]: {
    label: string;
    placeholder: string;
    rules: {
      required: string;
    };
    helperText: string;
  };
}

export const SIGN_IN_CONDITION: SignInConditionType = {
  id: {
    label: "",
    placeholder: "아이디를 입력하세요.",
    rules: {
      required: "아이디를 입력해주세요.",
    },
    helperText: "",
  },
  password: {
    label: "",
    placeholder: "비밀번호를 입력하세요.",
    rules: { required: "비밀번호를 입력해주세요." },
    helperText: "",
  },
};
