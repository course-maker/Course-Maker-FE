import classNames from "classnames/bind";
import styles from "./DateTab.module.scss";

const cx = classNames.bind(styles);

interface DateTabProps {
  days: number[];
  selectedDate: number;
  onClick: (day: number) => void;
}

const DateTab = ({ days, selectedDate, onClick }: DateTabProps) => {
  return (
    <div className={cx("container")}>
      {days.map((day) => (
        <button
          key={day}
          className={cx("btn", { isSelected: day === selectedDate })}
          onClick={() => onClick(day)}
          type="button">
          DAY {day}
        </button>
      ))}
    </div>
  );
};
export default DateTab;
