import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./StarScore.module.scss";

const cx = classNames.bind(styles);

interface StarScoreProps {
  score: number;
}

const StarScore = ({ score }: StarScoreProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("icon")}>
        <Image imageInfo={IMAGES.BlackStarIcon} />
      </div>
      <div className={cx("score")}>
        <span className={cx("score-stress")}>{score}</span> / 5
      </div>
    </div>
  );
};
export default StarScore;
