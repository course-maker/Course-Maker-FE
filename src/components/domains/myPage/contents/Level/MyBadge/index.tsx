import tempImg from "@/assets/images/child.svg";
import Badge from "./Badge";

import classNames from "classnames/bind";
import styles from "./MyBadge.module.scss";

const cx = classNames.bind(styles);

const mockData = [
  { id: 1, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 2, img: tempImg, title: "여행입문자", criteria: "여행지를 n개 이상 작성한 여행가" },
  { id: 3, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 5, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 6, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 4, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 7, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
  { id: 8, img: tempImg, title: "여행입문자", criteria: "첫 여행지를 작성한 여행가" },
];

const MyBadge = () => {
  return (
    <div className={cx("my-badge")}>
      <h2 className={cx("my-badge__title")}>내 뱃지</h2>
      <ul className={cx("my-badge__list")}>
        {mockData.map(({ id, img, title, criteria }) => (
          <li key={id}>
            <Badge img={img} title={title} criteria={criteria} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyBadge;
