import "./App.css";
import Error from "./components/Error";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

import { Home } from "./pages/Home";
import MobileNumberVerification from "./pages/MobileNumberVerification";
import OTPVERification from "./pages/OTPVerification";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const onOtpSubmit = () => {
    console.log("hello");
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <MobileNumberVerification />
            </PublicRoute>
          }
        />
        <Route
          path="user/otp"
          element={
            <ProtectedRoute>
              <OTPVERification length={6} onOtpSubmit={onOtpSubmit} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
