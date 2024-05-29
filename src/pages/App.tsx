import { Route, Routes } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import ScssExample from "./scss-example"; // fix: 나중에 지울것!

const { search } = PAGE_PATH;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={search} element={<SearchPage />} />
        <Route path="scss-example" element={<ScssExample />} />
      </Route>
    </Routes>
  );
}

export default App;
