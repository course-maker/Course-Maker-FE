import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Image from "@/components/commons/Image";

describe("Image Component", () => {
  const imageInfo = {
    src: "https://via.placeholder.com/150",
    alt: "Placeholder Image",
  };

  it("should render with default objectFit", () => {
    const { getByAltText } = render(<Image imageInfo={imageInfo} />);
    const imgElement = getByAltText("Placeholder Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.className).toMatch("img");
    expect(imgElement.className).toMatch("fill");
  });

  it("should render with objectFit cover", () => {
    const { getByAltText } = render(<Image imageInfo={imageInfo} objectFit="cover" />);
    const imgElement = getByAltText("Placeholder Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.className).toMatch("img");
    expect(imgElement.className).toMatch("cover");
  });

  it("should render with objectFit contain", () => {
    const { getByAltText } = render(<Image imageInfo={imageInfo} objectFit="contain" />);
    const imgElement = getByAltText("Placeholder Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.className).toMatch("img");
    expect(imgElement.className).toMatch("contain");
  });

  it("should render with objectFit scale-down", () => {
    const { getByAltText } = render(<Image imageInfo={imageInfo} objectFit="scale-down" />);
    const imgElement = getByAltText("Placeholder Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.className).toMatch("img");
    expect(imgElement.className).toMatch("scale-down");
  });

  it("should render with objectFit none", () => {
    const { getByAltText } = render(<Image imageInfo={imageInfo} objectFit="none" />);
    const imgElement = getByAltText("Placeholder Image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.className).toMatch("img");
    expect(imgElement.className).toMatch("none");
  });
});
