import { Route, Routes } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ScssExample from "./scss-example"; // fix: 나중에 지울것!
import CourseDetailPage from "./CourseDetailPage";
import SpotDetailPage from "./SpotDetailPage";
import CourseRegisterPage from "./CourseRegisterPage";
import SpotRegisterPage from "./SpotRegisterPage";

const { search, signIn, signUp, courseDetail, spotDetail, courseRegister, spotRegister } = PAGE_PATH;

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
        <Route path="scss-example" element={<ScssExample />} />
      </Route>
    </Routes>
  );
}

export default PageRouter;
