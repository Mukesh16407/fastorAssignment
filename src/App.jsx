import "./App.css";
import MobileNumberVerification from "./pages/MobileNumberVerification";
import OTPVERification from "./pages/OTPVerification";
function App() {
  const onOtpSubmit = () => {
    console.log("hello");
  };
  return (
    <div>
      {/* <MobileNumberVerification /> */}
      <OTPVERification length={6} onOtpSubmit={onOtpSubmit} />
    </div>
  );
}

export default App;
