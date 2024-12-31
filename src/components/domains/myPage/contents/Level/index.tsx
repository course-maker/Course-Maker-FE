import LevelProgressBar from "./LevelProgressBar";
import MyBadge from "./MyBadge";
import MyLevel from "./MyLevel";

import classNames from "classnames/bind";
import styles from "./Level.module.scss";

const cx = classNames.bind(styles);

const Level = () => {
  return (
    <div className={cx("level")}>
      <div className={cx("level__level")}>
        <section className={cx("level__level-info")}>
          <MyLevel />
        </section>
        <section>
          <LevelProgressBar />
        </section>
      </div>
      <article>
        <MyBadge />
      </article>
    </div>
  );
};
export default Level;
