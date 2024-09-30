import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

import classNames from "classnames/bind";
import styles from "./FullScreenMessage.module.scss";
const cx = classNames.bind(styles);

interface FullScreenMessageProps {
  type: "loading" | "error";
}

function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <div className={cx("container")}>
      {type === "loading" ? (
        <Loading />
      ) : (
        <>
          <Error />
          에러가 발생했어요 잠시 후 다시 시도해주세요.
        </>
      )}
    </div>
  );
}

function Error() {
  return (
    <div className={cx("spinner")}>
      <Image className={cx("bird")} imageInfo={IMAGES.courseMakerLogo} />
    </div>
  );
}

function Loading() {
  return (
    <div className={cx("spinner")}>
      <Image className={cx("bird")} imageInfo={IMAGES.courseMakerLogoMobile} />
    </div>
  );
}

export default FullScreenMessage;
