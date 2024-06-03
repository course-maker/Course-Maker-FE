import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import ItemBox from "@/components/commons/ItemBox/ItemBox";
import { IMAGES } from "@/constants/images";
const cx = classNames.bind(styles);

const Card = ({ item }: { item: any }) => {
  return (
    <div className={cx("card-container")}>
      <img alt={IMAGES.testImage.alt} src={IMAGES.testImage.src} className={cx("card-image")} />
      <div className={cx("card-content")}>
        <ItemBox location={item.location} title={item.title} icons={item.icons} />
      </div>
    </div>
  );
};

export default Card;
