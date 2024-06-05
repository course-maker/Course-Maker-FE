import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./SignInForm.module.scss";
import classNames from "classnames/bind";
import SignInputController from "@/components/commons/SignInputController";
import Button from "@/components/commons/Button";
import { PAGE_PATH } from "@/constants/pagePath";
import { SignInFormInputs, signInSchema } from "@/schemas/signInSchema";
import { SIGN_IN_CONDITION } from "@/constants/signInputCondition";
import { loginRequestDto } from "@/api/member/type";
import { postLogin } from "@/api/member";
import { saveAccessToken, saveRefreshToken } from "@/utils/manageTokenInfo";

const cx = classNames.bind(styles);

const SignInForm = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginEmail: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { mutateAsync: mutateAsyncForToken } = useMutation({
    mutationFn: (enteredSignInInfo: loginRequestDto) => postLogin(enteredSignInInfo),
  });

  const postSignIn = async (enteredSignInInfo: loginRequestDto) => {
    try {
      const tokens = await mutateAsyncForToken(enteredSignInInfo);
      if (tokens?.accessToken) {
        saveAccessToken(tokens.accessToken);
        saveRefreshToken(tokens.refreshToken);
        alert("로그인 성공!");
        navigate(PAGE_PATH.home);
      }
    } catch (error) {
      console.error("Error while signing in:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <form className={cx("form")} onSubmit={handleSubmit(postSignIn)}>
        <div className={cx("form-input")}>
          <div className={cx("form-input-field")}>
            <SignInputController name="loginEmail" control={control} condition={SIGN_IN_CONDITION.loginEmail} />
            <SignInputController name="password" control={control} condition={SIGN_IN_CONDITION.password} />
          </div>
          {/*fix: 고도화 부분. 나중에 링크 달기*/}
          {/* <p className={cx("form-input-forgot")}>이메일 | 비밀번호 찾기</p> */}
        </div>
        <Button type="submit" color="navy" variant="primary" size="large">
          로그인
        </Button>
      </form>
      <Button color="navy" variant="secondary" size="large" onClick={() => navigate(PAGE_PATH.signUp)}>
        회원가입
      </Button>
    </div>
  );
};

export default SignInForm;
