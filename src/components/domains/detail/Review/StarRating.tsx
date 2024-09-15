import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { ReviewFormType } from "@/type/type";
import classNames from "classnames/bind";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./StarRating.module.scss";

const cx = classNames.bind(styles);

interface StarRatingProps {
  control: Control<ReviewFormType>;
  isDisabled: boolean;
}

const StarRating = ({ control, isDisabled }: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <Controller
      name="rating"
      control={control}
      rules={{
        validate: {
          isSelected: (value) => {
            if (value) return true;
            return "별점을 선택해주세요.";
          },
        },
      }}
      render={({ field, fieldState }) => (
        <div className={cx("star-rating")}>
          <div className={cx("stars")}>
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className={cx("star", { isDisabled })}
                onMouseEnter={() => isDisabled || setHoveredStar(star)}
                onMouseLeave={() => isDisabled || setHoveredStar(null)}>
                <input
                  type="radio"
                  value={star}
                  checked={field.value === star}
                  onChange={() => isDisabled || field.onChange(star)}
                />
                <Image imageInfo={star <= (hoveredStar ?? field.value) ? IMAGES.blueStar : IMAGES.BlackStarIcon} />
              </label>
            ))}
          </div>
          <p className={cx("helper-text")}>{fieldState.error?.message}</p>
        </div>
      )}
    />
  );
};

export default StarRating;
