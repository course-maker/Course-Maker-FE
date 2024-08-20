import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";

import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

export type BarColor = "blue" | "gray";
export interface SearchBarProps {
  color?: BarColor;
}

const SearchBar = ({ color = "blue" }: SearchBarProps) => {
  return (
    <div className={cx(`search-bar-${color}`, "search-bar")}>
      <Image className={cx("search_img")} imageInfo={IMAGES.GraySerchbarIcon} />
      <input type="text" placeholder="어디로 떠나시나요?" />
    </div>
  );
};

export default SearchBar;
