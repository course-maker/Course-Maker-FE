import Image from "@/components/commons/Image";
import { UserLevelInfo } from "@/type/type";

import classNames from "classnames/bind";
import styles from "./LevelInfoBox.module.scss";

const cx = classNames.bind(styles);

interface LevelInfoBoxProps {
  info: UserLevelInfo;
}

const LevelInfoBox = ({ info }: LevelInfoBoxProps) => {
  const { level, imgInfo, requirement, benefits } = info;

  return (
    <div className={cx("level-info-box")}>
      <div className={cx("level-info-box__level")}>
        <div className={cx("level-info-box__level-img")}>
          <Image imageInfo={imgInfo} objectFit="cover" />
        </div>
        <h3 className={cx("level-info-box__level-name")}>{level}</h3>
      </div>

      <p className={cx("level-info-box__requirement")}>
        {requirement.description}
        {requirement.additionalInfo && (
          <span className={cx("level-info-box__requirement-additionalInfo")}>{info.requirement.additionalInfo}</span>
        )}
      </p>

      <p className={cx("level-info-box__description")}>
        {benefits.description}
        {benefits.additionalInfo && (
          <span className={cx("level-info-box__description-additionalInfo")}>{benefits.additionalInfo}</span>
        )}
      </p>
    </div>
  );
};
export default LevelInfoBox;
