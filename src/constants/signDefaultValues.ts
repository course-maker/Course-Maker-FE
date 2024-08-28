export const SIGNUP_DEFAULT_VALUES = {
  email: "",
  code: "",
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
  phoneNumber: "",
};

export const inputOrder = Object.keys(SIGNUP_DEFAULT_VALUES) as Array<keyof typeof SIGNUP_DEFAULT_VALUES>;
