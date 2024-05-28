import React from "react";
import { ReactNode } from "react";

import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export type ButtonType = "button" | "submit" | "reset";
export type ButtonColor = "emerald" | "navy";
export type ButtonVariant = "primary" | "secondary" | "third";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonType;
  color: ButtonColor;
  variant: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button 컴포넌트
 * children, type, color, variant, size, isDisabled, onClick 속성을 가집니다.
 * children, color, variant는 필수 입력값입니다.
 * @property {string} type - 버튼 타입. "button" | "submit" | "reset". 입력하지 않을 경우 "button"로 설정
 * @property {string} color - 버튼 컬러. "emerald" | "navy";
 * @property {string} variant - 버튼 디자인. "primary" | "secondary" | "third"
 * @property {string} size - 버튼 사이즈. "small | medium | large". 입력하지 않을 경우 height: 100%, width:100% 로 설정
 * */
export default function Button({
  children,
  type = "button",
  color,
  variant,
  size,
  isDisabled = false,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClass = cx(`btn-${color}-${variant}`, size ? `btn-size-${size}` : "btn-size-default");

  return (
    <button className={buttonClass} type={type} color={color} disabled={isDisabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
