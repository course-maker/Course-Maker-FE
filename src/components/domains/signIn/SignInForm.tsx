import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.scss";
import classNames from "classnames/bind";
import SignInputController from "@/components/commons/SignInputController";
import Button from "@/components/commons/Button";
import { PAGE_PATH } from "@/constants/pagePath";

const cx = classNames.bind(styles);

export interface SignInFormInputs {
  id: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignInFormInputs>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = () => {
    // console.log(data);
  };

  return (
    <div className={cx("container")}>
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form-input")}>
          <div className={cx("form-input-field")}>
            <SignInputController name="id" control={control} />
            <SignInputController name="password" control={control} />
          </div>
          {/*fix: 고도화 부분. 나중에 링크 달기*/}
          <p className={cx("form-input-forgot")}>이메일 | 비밀번호 찾기</p>
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
