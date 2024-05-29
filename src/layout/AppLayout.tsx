import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
import NavigationBar from "@/components/commons/NavigationBar";

const cx = classNames.bind(styles);

const AppLayout = () => {
  return (
    <>
      <nav className={cx("nav")}>
        <NavigationBar />
      </nav>
      <main className={cx("main")}>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
