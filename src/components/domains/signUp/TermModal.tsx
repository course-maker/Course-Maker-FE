import Modal from "@/components/commons/Modal";
import { ModalTermContentBox } from "@/components/commons/Modal/ModalTermContentBox";
import { KeyboardEventHandler, MouseEventHandler } from "react";

type TermModalProps = {
  isOpen: boolean;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const TermModal = ({ isOpen, onCloseClick, onKeyDown }: TermModalProps) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown}>
      <ModalTermContentBox onCloseClick={onCloseClick} />
    </Modal>
  );
};
