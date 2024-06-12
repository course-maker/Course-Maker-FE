/* eslint-disable */
import { Quill } from "react-quill";
const BlockEmbed = Quill.import("blots/block/embed");

class CustomImage extends BlockEmbed {
  static blotName = "customImage";
  static tagName = "img";

  static create(value: CustomImage) {
    let node = super.create();
    node.setAttribute("src", value.url);
    if (value.width) {
      node.setAttribute("width", value.width);
    }
    node.setAttribute("style", value.style || "");
    return node;
  }

  static value(node: HTMLElement) {
    return {
      url: node.getAttribute("src"),
      width: node.getAttribute("width"),
      style: node.getAttribute("style"),
    };
  }
}

Quill.register(CustomImage);
export default CustomImage;
