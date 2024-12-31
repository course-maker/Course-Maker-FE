import Image from "@/components/commons/Image";

import classNames from "classnames/bind";
import styles from "./Badge.module.scss";

const cx = classNames.bind(styles);

interface BadgeProps {
  img: string;
  title: string;
  criteria: string;
}

const Badge = ({ img, title, criteria }: BadgeProps) => {
  return (
    <figure className={cx("badge")}>
      <div className={cx("badge__img")}>
        <Image imageInfo={{ src: img, alt: `${title} 뱃지 이미지` }} />
      </div>
      <figcaption className={cx("badge__description")}>
        <h4 className={cx("badge__description-title")}>{title}</h4>
        <p className={cx("badge__description-criteria")}>{criteria}</p>
      </figcaption>
    </figure>
  );
};
export default Badge;
