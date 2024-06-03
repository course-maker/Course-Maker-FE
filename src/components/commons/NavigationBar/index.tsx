import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import MenuBar from "./MenuBar";
import { IMAGES } from "@/constants/images";
import { PAGE_PATH } from "@/constants/pagePath";
import RightButtons from "./RightButtons";

const cx = classNames.bind(styles);

const NavigationBar = () => {
  return (
    <div className={cx("nav")}>
      <Link className={cx("nav-logo")} to={PAGE_PATH.home}>
        <Image imageInfo={IMAGES.courseMakerLogo} />
      </Link>
      <MenuBar />
      <RightButtons />
    </div>
  );
};

export default NavigationBar;
