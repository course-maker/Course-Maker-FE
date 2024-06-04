import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/pages/App";

test("renders the Home Page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  // Home Page 컴포넌트가 렌더링되었는지 확인
  const headingElement = screen.getByTestId("home-page");
  expect(headingElement).toBeInTheDocument();
});
