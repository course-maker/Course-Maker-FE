import classNames from "classnames/bind";
import styles from "./DateTab.module.scss";

const cx = classNames.bind(styles);

interface DateTabProps {
  days: number[];
  selectedDate: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
}

const DateTab = ({ days, selectedDate, setSelectedDate }: DateTabProps) => {
  return (
    <div className={cx("container")}>
      {days.map((day) => (
        <button
          key={day}
          className={cx("btn", { isSelected: day === selectedDate })}
          onClick={() => setSelectedDate(day)}>
          DAY {day}
        </button>
      ))}
    </div>
  );
};
export default DateTab;
