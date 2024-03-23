import "./App.css";
import { Home } from "./pages/Home";
import MobileNumberVerification from "./pages/MobileNumberVerification";
import OTPVERification from "./pages/OTPVerification";
import { Routes, Route } from "react-router-dom";
function App() {
  const onOtpSubmit = () => {
    console.log("hello");
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<MobileNumberVerification />} />
      <Route
        path="/otp"
        element={<OTPVERification length={6} onOtpSubmit={onOtpSubmit} />}
      />
    </Routes>
  );
}

export default App;
