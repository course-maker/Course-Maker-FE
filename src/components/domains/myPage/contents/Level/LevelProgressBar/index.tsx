import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { authState } from "@/recoil/authAtom";
import classNames from "classnames/bind";
import { useRecoilState } from "recoil";
import styles from "./LevelProgressBar.module.scss";

const cx = classNames.bind(styles);

const LevelProgressBar = () => {
  const [auth] = useRecoilState(authState);

  if (!auth) {
    return (
      <div>
        <p>사용자 정보를 불러올 수 없습니다.</p>
        <Image imageInfo={IMAGES.courseMakerLogoMobile} />
      </div>
    );
  }

  return (
    <div className={cx("progress-bar")}>
      <div className={cx("progress-bar__track")}>
        <div
          className={cx(
            "progress-bar__track-fill",
            { beginner: auth.role === "초보 여행가" },
            { intermediate: auth.role === "중급 여행가" },
            { expert: auth.role === "프로 여행가" },
          )}></div>
      </div>
      <div className={cx("progress-bar__labels")}>
        <span className={cx("progress-bar__labels-el")}>초보여행가</span>
        <span className={cx("progress-bar__labels-el")}>중급여행가</span>
        <span className={cx("progress-bar__labels-el")}>프로여행가</span>
      </div>
    </div>
  );
};
export default LevelProgressBar;
