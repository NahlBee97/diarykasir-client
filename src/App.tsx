import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CashierLayout from "./layouts/CashierLayout";
import Pos from "./pages/Pos";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Cashier routes */}
          <Route path="/" element={<CashierLayout />}>
            <Route index element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/pos" element={<Pos />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
