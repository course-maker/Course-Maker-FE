import styles from "./Banner.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  subtitle?: string;
  size?: "small" | "large";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Banner 컴포넌트
 * @property {string} size - 배너 사이즈."small" | "large". 입력하지 않을 경우 height: 100%, width:100% 로 설정
 * */

const Banner = ({ image, title, subtitle, size, onClick, ...props }: BannerProps) => {
  return (
    <div
      className={cx("banner-content", size ? `banner-size-${size}` : "banner-size-default")}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
      {...props}>
      <div className={cx("banner-text")}>
        <p className={cx("banner-title")}>{title}</p>
        <p className={cx("banner-subtitle")}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
