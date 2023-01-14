import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import "./App.css";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/calculator"
        element={
          <ProtectedRoute>
            <Calculator />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
