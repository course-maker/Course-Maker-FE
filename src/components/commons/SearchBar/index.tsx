import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SearchBar = () => {
  return (
    <div className={cx("search-bar")}>
      <input type="text" placeholder="어디로 떠나시나요?" />
    </div>
  );
};

export default SearchBar;
