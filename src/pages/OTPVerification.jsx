/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { MainButton } from "../components/Buton";

const OTPVerification = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  console.log(inputRefs, "InputRef");

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

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
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
    <Box>
      <Box
        sx={{
          width: "50%",
          margin: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            marginRight: "60%",
            marginBottom: "20%",
            border: "1px solid #DADADA",
          }}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <Box sx={{ marginBottom: "30px", marginLeft: "23px" }}>
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

        <form>
          <Box
            sx={{
              marginBottom: "40px",
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            {otp.map((value, index) => (
              <TextField
                key={index}
                type="text"
                inputRef={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otpInput"
                sx={{
                  background: "#F7F8F9",
                  height: "100%",
                  width: "40px",
                  textAlign: "center",
                  fontSize: "1.2em",
                }}
              />
            ))}
          </Box>
          <MainButton type="submit">Verify</MainButton>
        </form>
        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="p">Didn’t received code? Resend</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OTPVerification;
