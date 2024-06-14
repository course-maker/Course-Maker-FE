import styles from "./Banner.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title?: string;
  subtitle?: string;
  size?: "small" | "large" | "x-large";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Banner: React.FC<BannerProps> = ({ image, title, subtitle, size, onClick, ...props }) => {
  return (
    <div
      className={cx("banner-content", size ? `banner-size-${size}` : "banner-size-default")}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
      {...props}>
      <div className={cx(`banner-text-${size}`)}>
        {title &&
          title.split("\n").map((line, index) => (
            <p key={index} className={cx("banner-title")}>
              {line}
            </p>
          ))}
        <p className={cx("banner-subtitle")}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
