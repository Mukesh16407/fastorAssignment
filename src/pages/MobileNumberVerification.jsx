import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { MainButton } from "../components/Buton";
import { register } from "../functions/auth";

export const MainWrapper = styled(Box)({
  width: "50%",
  margin: "auto",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  justifyContent: "center",
});

const MobileNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Simulate sending verification code
    const dial_code = +91;
    register(dial_code, phoneNumber);
    console.log("Sending verification code to:", phoneNumber);
  };

  return (
    <MainWrapper>
      <Box sx={{ marginBottom: "30px" }}>
        <Typography variant="h6" sx={{ fontSize: 26, fontWeight: 700 }}>
          Enter Your Mobile Number
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 16, lineHeight: "24px", color: "#888" }}
        >
          We will send you the 4 digit verification code
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            type="tel"
            value={phoneNumber}
            onChange={handleChange}
            error={isSubmitted && phoneNumber === ""}
            helperText={
              isSubmitted && phoneNumber === ""
                ? "Please enter your mobile number"
                : ""
            }
            fullWidth
            sx={{
              borderRadius: "8px",
              border: "1px solid #DADADA",
              marginBottom: "20px",
            }}
          />
          <MainButton type="submit">Send Code</MainButton>
        </form>
      </Box>
    </MainWrapper>
  );
};

export default MobileNumberVerification;
