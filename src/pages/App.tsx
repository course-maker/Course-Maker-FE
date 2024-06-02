import { Route, Routes } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SignInPage from "./SignInPage";
import ScssExample from "./scss-example"; // fix: 나중에 지울것!
import CourseDetailPage from "./CourseDetailPage";
import SpotDetailPage from "./SpotDetailPage";

const { search, signIn, courseDetail, spotDetail } = PAGE_PATH;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={search} element={<SearchPage />} />
        <Route path={signIn} element={<SignInPage />} />
        <Route path={courseDetail} element={<CourseDetailPage />} />
        <Route path={spotDetail} element={<SpotDetailPage />} />
        <Route path="scss-example" element={<ScssExample />} />
      </Route>
    </Routes>
  );
}

export default App;
