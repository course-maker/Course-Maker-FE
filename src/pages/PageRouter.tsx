import { Route, Routes } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import CourseDetailPage from "./CourseDetailPage";
import SpotDetailPage from "./SpotDetailPage";
import CourseRegisterPage from "./CourseRegisterPage";
import SpotRegisterPage from "./SpotRegisterPage";
import SpotEditPage from "./spotEditPage";
import AuthListener from "@/components/commons/AuthListener";

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
