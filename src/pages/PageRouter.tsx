import AuthListener from "@/components/commons/AuthListener";
import { PAGE_PATH } from "@/constants/pagePath";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const HomePage = lazy(() => import("./HomePage"));
const SearchPage = lazy(() => import("./SearchPage"));
const SignInPage = lazy(() => import("./SignInPage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const CourseDetailPage = lazy(() => import("./CourseDetailPage"));
const SpotDetailPage = lazy(() => import("./SpotDetailPage"));
const CourseRegisterPage = lazy(() => import("./CourseRegisterPage"));
const SpotRegisterPage = lazy(() => import("./SpotRegisterPage"));
const SpotEditPage = lazy(() => import("./SpotEditPage"));

const { search, signIn, signUp, courseDetail, spotDetail, courseRegister, spotRegister, spotEdit, authKakao } =
  PAGE_PATH;

function PageRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={search} element={<SearchPage />} />
          <Route path={signIn} element={<SignInPage />} />
          <Route path={signUp} element={<SignUpPage />} />
          <Route path={courseDetail} element={<CourseDetailPage />} />
          <Route path={spotDetail} element={<SpotDetailPage />} />
          <Route path={courseRegister} element={<CourseRegisterPage />} />
          <Route path={spotRegister} element={<SpotRegisterPage />} />
          <Route path={spotEdit} element={<SpotEditPage />} />
        </Route>
        <Route path={authKakao} element={<AuthListener />} />
      </Routes>
    </Suspense>
  );
}

export default PageRouter;
