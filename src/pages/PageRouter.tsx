import AuthListener from "@/components/commons/AuthListener";
import { PAGE_PATH } from "@/constants/pagePath";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const HomePage = lazy(() => import("./HomePage"));
const SearchPage = lazy(() => import("./SearchPage"));
const SignInPage = lazy(() => import("./SignInPage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const CourseDetailPage = lazy(() => import("./CourseDetailPage"));
const DestinationDetailPage = lazy(() => import("./DestinationDetailPage"));
const CourseRegisterPage = lazy(() => import("./CourseRegisterPage"));
const DestinationRegisterPage = lazy(() => import("./DestinationRegisterPage"));
const DestinationEditPage = lazy(() => import("./DestinationEditPage"));
const MyPage = lazy(() => import("./MyPage"));

const {
  search,
  signIn,
  signUp,
  courseDetail,
  destinationDetail,
  courseRegister,
  destinationRegister,
  destinationEdit,
  myPage,
  authKakao,
} = PAGE_PATH;

function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={search} element={<SearchPage />} />
        <Route path={signIn} element={<SignInPage />} />
        <Route path={signUp} element={<SignUpPage />} />
        <Route path={courseDetail} element={<CourseDetailPage />} />
        <Route path={destinationDetail} element={<DestinationDetailPage />} />
        <Route path={courseRegister} element={<CourseRegisterPage />} />
        <Route path={destinationRegister} element={<DestinationRegisterPage />} />
        <Route path={destinationEdit} element={<DestinationEditPage />} />
        <Route path={myPage} element={<MyPage />} />
      </Route>
      <Route path={authKakao} element={<AuthListener />} />
    </Routes>
  );
}

export default PageRouter;
