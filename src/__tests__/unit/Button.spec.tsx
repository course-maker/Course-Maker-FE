import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonProps } from "@/components/commons/button";
import { vi } from "vitest";

describe("Button Component", () => {
  const defaultProps: ButtonProps = {
    children: "Click Me",
    color: "emerald",
    variant: "primary",
    size: "medium",
  };

  it("버튼 내부 텍스트", () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("클래스 이름 적용", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText("Click Me");
    expect(button.className).toMatch("btn-emerald-primary");
    expect(button.className).toMatch("btn-size-medium");
  });

  it("onClick 핸들러 호출", () => {
    const handleClick = vi.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("isDisabled가 true일 때 버튼 비활성화", () => {
    render(<Button {...defaultProps} isDisabled />);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });

  it('type 기본값 "button"이 적용', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("type", "button");
  });

  it("type 적용", () => {
    render(<Button {...defaultProps} type="submit" />);
    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("type", "submit");
  });
});
