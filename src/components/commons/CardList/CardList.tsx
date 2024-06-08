import { ReactNode, useEffect, useRef } from "react";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface AllCardListProps {
  children: ReactNode[];
}

interface FilterCardListProps {
  children: ReactNode;
}

export const AllCardList = ({ children }: AllCardListProps) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0; // 첫 번째 아이템을 처음에 보이게 설정
    }
  }, []);

  return (
    <div className={cx("list-container")} ref={listContainerRef}>
      <div className={cx("list-box")}>{children}</div>
    </div>
  );
};

export const FilterCardList = ({ children }: FilterCardListProps) => {
  return <div>{children}</div>;
};
