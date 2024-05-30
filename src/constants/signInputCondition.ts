interface SignInConditionType {
  [key: string]: {
    label: string;
    type: string;
    placeholder: string;
    rules: {
      required: string;
      maxLength?: { value: number; message: string };
    };
    helperText: string;
    maxLength?: number;
  };
}

export const SIGN_IN_CONDITION: SignInConditionType = {
  id: {
    label: "",
    type: "email",
    placeholder: "아이디를 입력하세요.",
    rules: {
      required: "아이디를 입력해주세요.",
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
