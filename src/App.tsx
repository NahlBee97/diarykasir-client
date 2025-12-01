import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CashierLayout from "./layouts/CashierLayout";
import Pos from "./pages/Pos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* visitor routes */}
        <Route path="/" element={<CashierLayout />}>
          <Route index element={<Login />} />
          <Route path="/pos" element={<Pos />} />
        </Route>

        {/* Admin Routes
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="news/create" element={<CreateNews />} />
        <Route path="publications" element={<AdminPublications />} />
        <Route path="publications/create" element={<CreatePublication />} />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
