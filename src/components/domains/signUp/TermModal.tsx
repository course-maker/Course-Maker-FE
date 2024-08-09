import Modal from "@/components/commons/Modal";
import { ModalTermContentBox } from "@/components/commons/Modal/ModalTermContentBox";
import { Term } from "@/constants/terms";
import { KeyboardEventHandler, MouseEventHandler } from "react";

type TermModalProps = {
  isOpen: boolean;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  content: Term;
};

export const TermModal = ({ isOpen, onCloseClick, onKeyDown, content }: TermModalProps) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onCloseClick} onKeyDown={onKeyDown}>
      <ModalTermContentBox onCloseClick={onCloseClick} content={content} />
    </Modal>
  );
};
