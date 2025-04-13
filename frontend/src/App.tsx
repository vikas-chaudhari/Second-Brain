import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RouteProtector = ({ children }: any) => {
  const token = localStorage.getItem("token");
  return token ? (
    <div className="font-mono">{children}</div>
  ) : (
    <Navigate to={"/signin"} />
  );
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteProtector>
            <Dashboard />
          </RouteProtector>
        }
      />

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
