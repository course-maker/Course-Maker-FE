import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { KeyboardEvent, KeyboardEventHandler, MouseEvent, MouseEventHandler, ReactNode, useEffect } from "react";
import { Portal } from "./Portal";

const cx = classNames.bind(styles);

type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  onBackdropClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
};

const Modal = ({ children, isOpen = false, hideBackdrop = false, onBackdropClick, onKeyDown }: ModalProps) => {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={cx("container", { backdrop: !hideBackdrop })}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}>
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
