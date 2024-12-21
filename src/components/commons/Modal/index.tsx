import classNames from "classnames/bind";
import { KeyboardEvent, KeyboardEventHandler, MouseEvent, MouseEventHandler, ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Portal } from "./Portal";

const cx = classNames.bind(styles);

type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  isSidebar?: boolean;
  onBackdropClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>;
};

const Modal = ({
  children,
  isOpen = false,
  hideBackdrop = false,
  isSidebar = false,
  onBackdropClick,
  onKeyDown,
  onConfirmClick,
}: ModalProps) => {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && onConfirmClick) {
      onConfirmClick(event as unknown as MouseEvent<HTMLButtonElement>);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  useEffect(() => {
    if (isOpen && !hideBackdrop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, hideBackdrop]);

  useEffect(() => {
    const handleKeyDownListener = handleKeyDown as unknown as EventListener;

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDownListener);
    } else {
      document.removeEventListener("keydown", handleKeyDownListener);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDownListener);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={cx("container", { backdrop: !hideBackdrop }, { sidebar: isSidebar })}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}>
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
