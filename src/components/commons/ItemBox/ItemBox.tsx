import classNames from "classnames/bind";
import styles from "./ItemBox.module.scss";
import Badge from "@/components/commons/Badge/Badge";

import { tagResponseDto } from "@/api/tag/type";

const cx = classNames.bind(styles);

interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

interface ItemBoxProps {
  location: Location;
  title?: string;
  tags: tagResponseDto[];
}

const ItemBox: React.FC<ItemBoxProps> = ({ location, title, tags }) => {
  return (
    <div className={cx("item-box")}>
      <div className={cx("title-group")}>
        <p className={cx("item-title")}>{title}</p>
        <p className={cx("item-location")}>{location.address}</p>
      </div>
      <div className={cx("score-group")}>
        {tags?.map((tag) => (
          <Badge key={tag.id} color="gray" variant="primary" size="xsmall">
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ItemBox;
