import React from "react";
import { ReactNode } from "react";

import styles from "./Badge.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export type ButtonType = "button" | "submit" | "reset";
export type ButtonColor = "emerald" | "navy" | "gray" | "none";
export type ButtonVariant = "primary" | "secondary" | "third";
export type ButtonSize = "xsmall" | "small" | "medium" | "large";
export type ButtonStyle = "default" | "selected";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonType;
  color: ButtonColor;
  variant: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  badgeStyle?: ButtonStyle;
}

/**
 * Button 컴포넌트
 * children, type, color, variant, size, isDisabled, onClick, badgeStyle 속성을 가집니다.
 * children, color, variant는 필수 입력값입니다.
 * @property {string} type - 버튼 타입. "button" | "submit" | "reset". 입력하지 않을 경우 "button"로 설정
 * @property {string} color - 버튼 컬러. "emerald" | "navy" | "gray" | "none";
 * @property {string} variant - 버튼 디자인. "primary" | "secondary" | "third"
 * @property {string} size - 버튼 사이즈. "xsmall" | "small | medium | large". 입력하지 않을 경우 height: 100%, width:100% 로 설정
 * @property {string} badgeStyle - 뱃지 스타일. "default" | "selected"
 * */

const Badge = ({
  children,
  type = "button",
  color,
  variant,
  size,
  badgeStyle,
  isDisabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const buttonClass = cx(
    `btn-${color}-${variant}`,
    size ? `btn-size-${size}` : "btn-size-default",
    `btn-badge-${badgeStyle}`,
  );

  return (
    <button className={buttonClass} type={type} color={color} disabled={isDisabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Badge;
