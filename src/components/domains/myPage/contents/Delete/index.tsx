import Button from "@/components/commons/Button";
import Text from "@/components/commons/Text";
import { AlertModal } from "@/components/domains/signIn/AlertModal";
import { MODALS } from "@/constants/modals";
import { useWithDrawalMutation } from "@/hooks/useWithDrawalMutation";
import classNames from "classnames/bind";
import { KeyboardEvent } from "react";
import styles from "./Delete.module.scss";
const cx = classNames.bind(styles);

const Delete = () => {
  const { deleteUser, isModalOpen, setIsModalOpen } = useWithDrawalMutation();

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteUser();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
    if (e.key === "Enter") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("items")}>
        <div className={cx("auth-form")}>
          <Text className={cx("auth-form-txt")} text="회원 탈퇴 시 등록한 여행지와 코스는 삭제되지 않습니다." />
          <Text className={cx("auth-form-txt")} text="탈퇴하시겠습니까?" />
          <form onSubmit={handleDeleteSubmit}>
            <div style={{ marginTop: "2rem" }}></div>
            <Button type="submit" color="blue" variant="primary" size="large" isSquare={true}>
              회원탈퇴
            </Button>
          </form>
        </div>
      </div>
      <AlertModal
        isOpen={isModalOpen}
        content={MODALS.successWithDrawal.message}
        hasCloseBtn={MODALS.successWithDrawal.hasCloseBtn}
        onCloseClick={() => {
          setIsModalOpen(false);
        }}
        onConfirmClick={() => {
          setIsModalOpen(false);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default Delete;
