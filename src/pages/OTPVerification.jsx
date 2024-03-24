/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { MainButton } from "../components/Buton";
import { MainTextField } from "../components/MainInput";
import { MainWrapper } from "./MobileNumberVerification";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const OTPVerification = ({ length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []); // Add length as a dependency to useEffect

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const combinedOtp = otp.join("");
    if (!combinedOtp) {
      toast.error("Enter Your Otp");
    } else if (!/^\d+$/.test(combinedOtp)) {
      toast.error("Enter Valid Otp");
    } else if (combinedOtp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      const formData = new URLSearchParams();
      formData.append("phone", location.state);
      formData.append("dial_code", "+91");
      formData.append("otp", combinedOtp);

      try {
        const response = await axios.post(
          "https://staging.fastor.in/v1/pwa/user/login",
          formData.toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("Response data:", response.data);
        if (
          response.status === 200 &&
          response.data &&
          response.data.data &&
          response.data.data.token
        ) {
          localStorage.setItem("userdbtoken", response.data.data.token);
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          if (response && response.data && response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <MainWrapper sx={{ width: "30%" }}>
      <Button
        sx={{
          marginRight: "82%",
          marginBottom: "20%",
          border: "1px solid #DADADA",
        }}
        onClick={() => navigate("/login")}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ marginBottom: "30px" }}>
          <Typography variant="h6" sx={{ fontSize: 26, fontWeight: 700 }}>
            OTP Verification
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 16, lineHeight: "24px", color: "#888" }}
          >
            Enter the verification code we just sent on your
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 16, lineHeight: "24px", color: "#888" }}
          >
            Mobile Number.
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleVerify}>
        <Box
          sx={{
            marginBottom: "40px",
            display: "flex",
            flexDirection: "row",
            gap: "15px",
          }}
        >
          {otp.map((value, index) => (
            <MainTextField
              key={index}
              type="text"
              inputRef={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              sx={{ textAlign: "center" }}
            />
          ))}
        </Box>
        <MainButton type="submit">Verify</MainButton>
      </form>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant="p">
          Didn’t received code? <Link to="#">Resend</Link>
        </Typography>
      </Box>
      <ToastContainer />
    </MainWrapper>
  );
};

export default OTPVerification;
