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
import { AlertModal } from "./AlertModal";
import { MODALS } from "@/constants/modals";
import { KeyboardEvent } from "react";
import { useSignInMutation } from "@/hooks/useSignInMutation";

const cx = classNames.bind(styles);

const SignInForm = () => {
  const navigate = useNavigate();
  const { postSignIn, currentModal, setCurrentModal } = useSignInMutation();

  const { control, handleSubmit } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginEmail: "",
      password: "",
    },
    mode: "onBlur",
  });

  const closeModal = () => setCurrentModal(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
  const handleClickRedirect = () => {
    navigate(PAGE_PATH.signUp);
  };

  return (
    <>
      <div className={cx("container")}>
        <form className={cx("form")} onSubmit={handleSubmit((data) => postSignIn(data))}>
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
      <AlertModal
        isOpen={currentModal === MODALS.invalidEmail.id}
        message={MODALS.invalidEmail.message}
        hasCloseBtn={MODALS.invalidEmail.hasCloseBtn}
        onCloseClick={closeModal}
        onConfirmClick={handleClickRedirect}
        onKeyDown={handleKeyDown}
      />
      <AlertModal
        isOpen={currentModal === MODALS.invalidPassword.id}
        message={MODALS.invalidPassword.message}
        hasCloseBtn={MODALS.invalidPassword.hasCloseBtn}
        onConfirmClick={closeModal}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default SignInForm;
