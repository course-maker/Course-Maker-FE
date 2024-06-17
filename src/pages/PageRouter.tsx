import AuthListener from "@/components/commons/AuthListener";
import { PAGE_PATH } from "@/constants/pagePath";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import CourseDetailPage from "./CourseDetailPage";
import CourseRegisterPage from "./CourseRegisterPage";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import SpotDetailPage from "./SpotDetailPage";
import SpotEditPage from "./SpotEditPage";
import SpotRegisterPage from "./SpotRegisterPage";

const { search, signIn, signUp, courseDetail, spotDetail, courseRegister, spotRegister, spotEdit, authKakao } =
  PAGE_PATH;

function PageRouter() {
  return (
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
  );
}

export default PageRouter;
