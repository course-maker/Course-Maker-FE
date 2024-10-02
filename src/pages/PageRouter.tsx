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
const CourseEditPage = lazy(() => import("./CourseEditPage"));
const DestinationRegisterPage = lazy(() => import("./DestinationRegisterPage"));
const DestinationEditPage = lazy(() => import("./DestinationEditPage"));
const MyPage = lazy(() => import("./MyPage"));
const MyPageLikes = lazy(() => import("./MyPage/MyPageLikes"));
const MyPageRank = lazy(() => import("./MyPage/MyPageRank"));
const MyPageTrips = lazy(() => import("./MyPage/MyPageTrips"));

const {
  search,
  signIn,
  signUp,
  courseDetail,
  courseEdit,
  destinationDetail,
  courseRegister,
  destinationRegister,
  destinationEdit,
  myPage,
  myPageLikes,
  myPageRank,
  myPageTrips,
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
        <Route path={courseEdit} element={<CourseEditPage />} />
        <Route path={destinationRegister} element={<DestinationRegisterPage />} />
        <Route path={destinationEdit} element={<DestinationEditPage />} />
        <Route path={myPage} element={<MyPage />} />
        <Route path={myPageLikes} element={<MyPageLikes />} />
        <Route path={myPageRank} element={<MyPageRank />} />
        <Route path={myPageTrips} element={<MyPageTrips />} />
      </Route>
      <Route path={authKakao} element={<AuthListener />} />
    </Routes>
  );
}

export default PageRouter;
