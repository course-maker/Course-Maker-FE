export enum StatusType {
  UNVERIFIED = "unverified",
  PENDING = "pending",
  SUCCESS = "success",
  FAIL = "fail",
  TIMER = "timer",
  EXPIRED = "expired",
}

export const STATUS_MESSAGES = {
  email: {
    unverified: "",
    pending: "인증코드를 전송중입니다.",
    success: "이메일로 인증코드를 발송하였습니다.",
    fail: "",
    expired: "",
  },
  code: {
    unverified: "",
    timer: (formattedTime: string) => `인증코드 유효 시간 ${formattedTime}`,
    success: "인증이 완료되었습니다.",
    fail: "",
    expired: "",
  },
};

export enum ErrorType {
  CONFLICT = "conflict",
  MISMATCH = "mismatch",
  EXPIRED = "expired",
  UNKNOWN = "unknownError",
}

export const ERROR_MESSAGES = {
  email: {
    conflict: "가입된 이메일 입니다. 다른 이메일을 입력해주세요.",
    expired: "인증코드가 만료되었습니다.\n재전송해 주세요.",
    unknown: "알 수 없는 이메일 오류가 발생했습니다. 다시 시도해 주세요.",
  },
  code: {
    mismatch: "인증코드가 일치하지 않습니다.",
    unknown: "알 수 없는 인증코드 오류가 발생했습니다. 다시 시도해 주세요.",
  },
  nickname: {
    conflict: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.",
    unknown: "알 수 없는 닉네임 오류가 발생했습니다. 다시 시도해 주세요.",
  },
};
