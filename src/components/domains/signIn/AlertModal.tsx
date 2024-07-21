import Modal from "@/components/commons/Modal";
import ModalContentBox from "@/components/commons/Modal/ModalContentBox";
import { KeyboardEventHandler, MouseEventHandler } from "react";

type AlertModalProps = {
  isOpen: boolean;
  content: string;
  hasCloseBtn: boolean;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const AlertModal = ({
  isOpen,
  content,
  hasCloseBtn,
  onCloseClick,
  onConfirmClick,
  onKeyDown,
}: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown} onConfirmClick={onConfirmClick}>
      <ModalContentBox
        content={content}
        hasCloseBtn={hasCloseBtn}
        onCloseClick={onCloseClick}
        onConfirmClick={onConfirmClick}
      />
    </Modal>
  );
};
