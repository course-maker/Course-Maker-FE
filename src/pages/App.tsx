import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
