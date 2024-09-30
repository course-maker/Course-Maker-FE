import MobileNavigationBar from "@/components/commons/MobileNavigationBar";
import MobileTabBar from "@/components/commons/MobileTabBar";
import NavigationBar from "@/components/commons/NavigationBar";
import useAuth from "@/hooks/useAuth";
import { isSignPage } from "@/utils/pageHelpers";
import classNames from "classnames/bind";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import styles from "./AppLayout.module.scss";

const cx = classNames.bind(styles);

const AppLayout = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const isDesktopSize = width > 1199;

  return (
    <>
      {isSignPage(pathname) ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ) : (
        <>
          <nav className={cx("nav")}>
            {isDesktopSize ? <NavigationBar isAuth={!!auth} /> : <MobileNavigationBar isAuth={!!auth} />}
          </nav>
          <main className={cx("main")}>
            <div className={cx("empty")}></div>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </main>
          {!isDesktopSize && (
            <nav className={cx("tabBar")}>
              <MobileTabBar />
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default AppLayout;
