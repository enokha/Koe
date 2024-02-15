import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      {/* PublicRoute for login page */}
      <Route path="/login/*" element={<PublicRoute />}>
        <Route index element={<LoginPage />} />
      </Route>

      {/* PrivateRoute for home page (requires authentication) */}
      <Route path="/home/*" element={<PrivateRoute />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
