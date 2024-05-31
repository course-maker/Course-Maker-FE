import SignInputController from "@/components/commons/SignInputController";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./SignInForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface SignInFormInputs {
  id: string;
  password: string;
}

const SignInForm = () => {
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
          <p className={cx("form-input-forgot")}>아이디 | 비밀번호 찾기</p>
        </div>
        {/*fix: Button 컴포넌트로 교체 예정*/}
        <button type="submit">로그인</button>
      </form>
      {/*fix: Button 컴포넌트로 교체 예정*/}
      <button>회원가입</button>
    </div>
  );
};

export default SignInForm;
