import Button from "@/components/commons/Button";
import { AlertModal } from "@/components/domains/signIn/AlertModal";
import { MODALS } from "@/constants/modals";
import { PAGE_PATH } from "@/constants/pagePath";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";
import classNames from "classnames/bind";
import { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RightButtons.module.scss";

const cx = classNames.bind(styles);

const RightButtons = ({ isAuth }: { isAuth: boolean | null }) => {
  const navigate = useNavigate();
  const { logout, isModalOpen, setIsModalOpen } = useLogoutMutation();
  const { signIn, signUp } = PAGE_PATH;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    if (e.key === "Enter") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isAuth ? (
        <div className={cx("container")}>
          <Button color="blue" variant="primary" size="small">
            마이페이지
          </Button>
          <Button color="blue" variant="secondary" size="small" onClick={() => logout()}>
            로그아웃
          </Button>
        </div>
      ) : (
        <div className={cx("container")}>
          <Button color="blue" variant="primary" size="small" onClick={() => navigate(signIn)}>
            로그인
          </Button>
          <Button color="blue" variant="secondary" size="small" onClick={() => navigate(signUp)}>
            회원가입
          </Button>
        </div>
      )}
      <AlertModal
        isOpen={isModalOpen}
        content={MODALS.successLogout.message}
        hasCloseBtn={MODALS.successLogout.hasCloseBtn}
        onCloseClick={() => {
          setIsModalOpen(false);
        }}
        onConfirmClick={() => {
          setIsModalOpen(false);
        }}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default RightButtons;
