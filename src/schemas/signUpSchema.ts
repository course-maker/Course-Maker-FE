import { validateNickname } from "@/utils/validateSignUpElements";
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, { message: "이메일 주소를 입력해주세요." }).email("올바른 이메일 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(15, { message: "비밀번호는 최대 15자까지 입력 가능합니다." })
      .regex(/[a-z]/, { message: "적어도 하나의 소문자가 포함되어야 합니다." })
      .regex(/\d/, { message: "적어도 하나의 숫자가 포함되어야 합니다." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "적어도 하나의 특수문자가 포함되어야 합니다." }),
    confirmPassword: z.string().min(1, { message: "비밀번호 확인을 입력해주세요." }),
    name: z
      .string()
      .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
      .max(10, { message: "이름은 최대 10자까지 입력 가능합니다." })
      .regex(/^[가-힣]+$/, { message: "이름은 한글만 포함할 수 있습니다." }),
    nickname: z
      .string()
      .min(2, { message: "닉네임은 최소 2자 이상이어야 합니다." })
      .max(10, { message: "닉네임은 최대 10자까지 입력 가능합니다." })
      .regex(/^[가-힣a-z0-9]+$/, { message: "닉네임은 한글, 영어 소문자, 숫자만 포함할 수 있습니다." })
      .refine(
        async (nickname) => {
          const isDuplicate = await validateNickname(nickname);
          return !isDuplicate;
        },
        { message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요." },
      ),
    phoneNumber: z
      .string()
      .min(1, { message: "휴대폰 번호를 입력해주세요." })
      .regex(/^\d{3}-\d{4}-\d{4}$/, { message: "휴대폰 번호는 숫자만 입력 가능합니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
