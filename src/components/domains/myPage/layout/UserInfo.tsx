import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

import classNames from "classnames/bind";
import styles from "./UserInfo.module.scss";

const cx = classNames.bind(styles);

const UserInfo = () => {
  const [auth] = useRecoilState(authState);
  const tempPoint = 1000;

  if (!auth) {
    return (
      <div>
        <p>사용자 정보를 불러올 수 없습니다.</p>
        <Image imageInfo={IMAGES.courseMakerLogoMobile} />
      </div>
    );
  }

  const { nickname, profileImgUrl, role } = auth; // fix: 백엔드에 point 값 요청하기

  return (
    <section className={cx("user-info")}>
      <div className={cx("user-info__nickname")}>
        {nickname}
        <span className={cx("user-info__nickname-suffix")}>님</span>
      </div>
      <div className={cx("user-info__profileImg")}>
        {profileImgUrl ? (
          <Image imageInfo={{ src: auth.profileImgUrl, alt: `${auth?.nickname} 의 프로필 사진` }} />
        ) : (
          <Image imageInfo={IMAGES.courseMakerLogoMobile} objectFit="scale-down" />
        )}
      </div>
      <div className={cx("user-info__role")}>{role}</div>
      <div className={cx("user-info__point")}>
        {tempPoint}
        <span className={cx("user-info__point-suffix")}> point</span>
      </div>
    </section>
  );
};
export default UserInfo;
