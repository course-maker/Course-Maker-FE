import Button from "@/components/commons/Button";
import SignInputController from "@/components/commons/SignInputController";
import { MODALS } from "@/constants/modals";
import { PAGE_PATH } from "@/constants/pagePath";
import { SIGN_IN_CONDITION } from "@/constants/signInputCondition";
import { useSignInMutation } from "@/hooks/useSignInMutation";
import { SignInFormInputs, signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames/bind";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "./AlertModal";
import styles from "./SignInForm.module.scss";

const cx = classNames.bind(styles);

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn, currentModal, setCurrentModal } = useSignInMutation();

  const { control, handleSubmit } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      loginEmail: "",
      password: "",
    },
    mode: "onChange",
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

  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (currentModal) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <form className={cx("form")} onSubmit={handleSubmit((data) => signIn(data))} onKeyDown={handleFormKeyDown}>
          <div className={cx("form-input")}>
            <SignInputController name="loginEmail" control={control} condition={SIGN_IN_CONDITION.loginEmail} />
            <SignInputController name="password" control={control} condition={SIGN_IN_CONDITION.password} />
          </div>
          <Button type="submit" color="blue" variant="primary" size="large">
            로그인
          </Button>
        </form>
        <Button color="blue" variant="secondary" size="large" onClick={() => navigate(PAGE_PATH.signUp)}>
          회원가입
        </Button>
      </div>
      <AlertModal
        isOpen={currentModal === MODALS.invalidEmail.id}
        content={MODALS.invalidEmail.message}
        hasCloseBtn={MODALS.invalidEmail.hasCloseBtn}
        onCloseClick={closeModal}
        onConfirmClick={handleClickRedirect}
        onKeyDown={handleKeyDown}
      />
      <AlertModal
        isOpen={currentModal === MODALS.invalidPassword.id}
        content={MODALS.invalidPassword.message}
        hasCloseBtn={MODALS.invalidPassword.hasCloseBtn}
        onCloseClick={closeModal}
        onConfirmClick={closeModal}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default SignInForm;
