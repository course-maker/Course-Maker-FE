import { REVEIW_FILTER } from "@/constants/reviewFilter";
import { FilterType } from "@/type/type";
import classNames from "classnames/bind";
import styles from "./FilterButtons.module.scss";

const cx = classNames.bind(styles);

interface FilterButtonsProps {
  selectedFilter: FilterType;
  onClick: (filter: FilterType) => void;
}

const FilterButtons = ({ selectedFilter, onClick }: FilterButtonsProps) => {
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
