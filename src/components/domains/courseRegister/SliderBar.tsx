import React from "react";
import styles from "./SliderBar.module.scss";

interface SliderProps {
  type: string;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ type, value, onChange }) => {
  const options = type === "travelerCount" ? ["1인", "2인", "3인", "4인", "5인이상"] : ["1일", "2일", "3일"];

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <div className={styles.sliderContainer}>
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.sliderButton} ${value === index + 1 ? styles.active : ""}`}
          onClick={() => handleClick(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Slider;
