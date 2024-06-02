import { ReactNode } from "react";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";
// import { IMAGES } from "@/constants/images";
// import Image from "../Image";

const cx = classNames.bind(styles);

interface AllCardListProps {
  children: ReactNode[];
}
interface FilterCardListProps {
  children: ReactNode;
}

export const AllCardList = ({ children }: AllCardListProps) => {
  return (
    <div>
      <div className={cx("list-title-group")}>
        <p className={cx("list-title")}>전체 여행지</p>
        <p className={cx("list-explanation")}>여행지를 클릭하면 여행지 상세페이지를 확인할 수 있습니다.</p>
      </div>
      <div className={cx("list-container")}>
        <div className={cx("list-box")}>{children}</div>
      </div>
    </div>
  );
};

export const FilterCardList = ({ children }: FilterCardListProps) => {
  return <div>{children}</div>;
};
