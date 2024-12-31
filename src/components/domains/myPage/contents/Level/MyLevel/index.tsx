import { useState } from "react";

import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

import classNames from "classnames/bind";
import AllLevelInfoModal from "./AllLevelInfoModal";
import styles from "./MyLevel.module.scss";

const cx = classNames.bind(styles);

const MyLevel = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [auth] = useRecoilState(authState);

  if (!auth) {
    return (
      <div>
        <p>사용자 정보를 불러올 수 없습니다.</p>
        <Image imageInfo={IMAGES.courseMakerLogoMobile} />
      </div>
    );
  }

  const { nickname, role } = auth;

  return (
    <>
      <div className={cx("my-level")}>
        <div className={cx("my-level__all-info")}>
          내 등급
          <button className={cx("my-level__all-info-question-mark")} onClick={() => setIsModalOpen(true)}>
            ?
          </button>
        </div>
        <h1 className={cx("my-level__my-info")}>
          <span className={cx("my-level__my-info--highlight")}>{nickname}</span>
          {" 님은"} <span className={cx("my-level__my-info--highlight")}>{role}</span>
          {" 입니다."}
        </h1>
      </div>

      <AllLevelInfoModal isModalOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)} />
    </>
  );
};
export default MyLevel;
