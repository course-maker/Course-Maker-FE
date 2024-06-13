import { KeyboardEventHandler, MouseEventHandler } from "react";
import Modal from "@/components/commons/Modal";
import ModalContentBox from "@/components/commons/Modal/ModalContentBox";

type AlertModalProps = {
  isOpen: boolean;
  message: string;
  hasCloseBtn: boolean;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const AlertModal = ({
  isOpen,
  message,
  hasCloseBtn,
  onCloseClick,
  onConfirmClick,
  onKeyDown,
}: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown} onConfirmClick={onConfirmClick}>
      <ModalContentBox
        message={message}
        hasCloseBtn={hasCloseBtn}
        onCloseClick={onCloseClick}
        onConfirmClick={onConfirmClick}
      />
    </Modal>
  );
};
