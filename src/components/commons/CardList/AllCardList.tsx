import { CourseDestination } from "@/api/course/type";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CardContent } from "../CardContent/CardContent";
import styles from "./AllCardList.module.scss";

const cx = classNames.bind(styles);

interface AllCardListProps {
  destinations: CourseDestination[];
  useLink?: boolean;
}

export const AllCardList = ({ destinations, useLink = false }: AllCardListProps) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className={cx("list-container")} ref={listContainerRef}>
      <div className={cx("list-box")}>
        {destinations.map((item) =>
          useLink ? (
            <Link className={cx("card-link")} to={`/destination/${item.destination.id}`} key={item.destination.id}>
              <CardContent item={item} />
            </Link>
          ) : (
            <div className={cx("card-link")}>
              <CardContent item={item} key={item.destination.id} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};
