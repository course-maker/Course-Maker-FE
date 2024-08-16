import classNames from "classnames/bind";
import React, { forwardRef, ReactNode } from "react";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

export type ButtonType = "button" | "submit" | "reset";
export type ButtonColor = "blue" | "emerald" | "navy" | "gray" | "none"; // fix: 필요없는 색은 나중에 삭제하기
export type ButtonVariant = "primary" | "secondary" | "third" | "badge";
export type ButtonSize = "xsmall" | "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonType;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isSquare?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button 컴포넌트
 * children, type, color, variant, size, isDisabled, onClick 속성을 가집니다.
 * children, color, variant는 필수 입력값입니다.
 * @property {string} type - 버튼 타입. "button" | "submit" | "reset". 입력하지 않을 경우 "button"로 설정
 * @property {string} color - 버튼 컬러. "blue"
 * @property {string} variant - 버튼 디자인. "primary" | "secondary" | "third" | "badge"
 * @property {string} size - 버튼 사이즈. "small | medium | large". 입력하지 않을 경우 height: 100%, width:100% 로 설정
 * */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, type = "button", color, variant, size, isSquare, isSelected, isDisabled = false, onClick, ...props },
    ref,
  ) => {
    const buttonClass = cx(
      `btn-${color}-${variant}`,
      size ? `btn-size-${size}` : "btn-size-default",
      isSquare && "btn-square",
      isSelected && `btn-${color}-${variant}-selected`,
    );

    return (
      <button
        ref={ref}
        className={buttonClass}
        type={type}
        color={color}
        disabled={isDisabled}
        onClick={onClick}
        {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
