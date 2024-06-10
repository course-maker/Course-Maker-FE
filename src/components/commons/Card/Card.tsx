import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import ItemBox from "@/components/commons/ItemBox/ItemBox";
import { IMAGES } from "@/constants/images";
import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
const cx = classNames.bind(styles);

const Card = ({ item, loading }: { item: any; loading: boolean }) => {
  const navigate = useNavigate();
  console.log(item);
  if (loading) {
    return (
      <div className={cx("card-container")}>
        <Skeleton height={200} width={300} className={cx("card-image")} />
        <div className={cx("card-content")}>
          <Skeleton count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className={cx("card-container")} onClick={() => navigate(`/course/${item.id}`)}>
      <img
        alt={IMAGES.testImage.alt}
        src={item.pictureLink ? item.pictureLink : IMAGES.testImage.src}
        className={cx("card-image")}
      />
      <div className={cx("card-content")}>
        <ItemBox location={item.location} title={item.name} tags={item.tags} />
      </div>
    </div>
  );
};

export default Card;
