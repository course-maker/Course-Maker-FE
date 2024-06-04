import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 주소가 아닙니다."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export type SignInFormInputs = z.infer<typeof signInSchema>;
