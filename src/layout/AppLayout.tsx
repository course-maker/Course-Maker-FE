import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
import NavigationBar from "@/components/commons/NavigationBar";
import useAuth from "@/hooks/useAuth";

const cx = classNames.bind(styles);

const AppLayout = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <nav className={cx("nav")}>
        <NavigationBar isAuth={isAuth} />
      </nav>
      <main className={cx("main")}>
        <div className={cx("empty")}></div>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
