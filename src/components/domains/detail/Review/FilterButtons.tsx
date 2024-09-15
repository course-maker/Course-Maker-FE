import { REVEIW_FILTER } from "@/constants/reviewFilter";
import { FilterType } from "@/type/type";
import classNames from "classnames/bind";
import { useWindowSize } from "usehooks-ts";
import styles from "./FilterButtons.module.scss";

const cx = classNames.bind(styles);

interface FilterButtonsProps {
  selectedFilter: FilterType;
  onClick: (filter: FilterType) => void;
}

const FilterButtons = ({ selectedFilter, onClick }: FilterButtonsProps) => {
  const { width } = useWindowSize();

  const isMobile = width < 744;

  if (isMobile) {
    return (
      <div className={cx("container")}>
        <select
          className={cx("dropdown")}
          onChange={(e) => onClick(e.target.value as FilterType)}
          value={selectedFilter}>
          {REVEIW_FILTER.map(({ id, name, type }) => (
            <option className={cx("menu")} key={id} value={type}>
              {name}
            </option>
          ))}
        </select>
        <span className={cx("dropdown-icon")}>▼</span>
      </div>
    );
  }

  return (
    <ul className={cx("filters")}>
      {REVEIW_FILTER.map(({ id, name, type }) => (
        <li key={id} className={cx("filter")}>
          <button className={cx("filter-btn", { isSelected: selectedFilter === type })} onClick={() => onClick(type)}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FilterButtons;
