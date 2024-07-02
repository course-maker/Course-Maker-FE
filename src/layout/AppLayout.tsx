import NavigationBar from "@/components/commons/NavigationBar";
import useAuth from "@/hooks/useAuth";
import { isAuthPage } from "@/utils/pageHelpers";
import classNames from "classnames/bind";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./AppLayout.module.scss";

const cx = classNames.bind(styles);

const AppLayout = () => {
  const { isAuth } = useAuth();
  const { pathname } = useLocation();
  const isSignPage = isAuthPage(pathname);

  return (
    <>
      {isSignPage || (
        <nav className={cx("nav")}>
          <NavigationBar isAuth={isAuth} />
        </nav>
      )}
      <main className={cx("main")}>
        <div className={cx("empty")}></div>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
