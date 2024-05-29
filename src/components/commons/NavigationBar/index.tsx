import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import MenuBar from "./MenuBar";
import { IMAGES } from "@/constants/images";
import { PAGE_PATH } from "@/constants/pagePath";

const cx = classNames.bind(styles);

const NavigationBar = () => {
  return (
    <nav className={cx("nav")}>
      <Link to={PAGE_PATH.home}>
        <Image imageInfo={IMAGES.courseMakerLogo} />
      </Link>
      <MenuBar />
      <div>버튼 자리</div>
    </nav>
  );
};

export default NavigationBar;
