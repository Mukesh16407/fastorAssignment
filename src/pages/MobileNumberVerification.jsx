import { Box, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { MainButton } from "../components/Buton";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

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
  const [spiner, setSpiner] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (phoneNumber === "") {
      toast.error("Enter Your Email !");
    } else {
      setSpiner(true);

      const formData = new URLSearchParams();
      formData.append("phone", phoneNumber);
      formData.append("dial_code", "+91");

      try {
        const response = await axios.post(
          "https://staging.fastor.in/v1/pwa/user/register",
          formData.toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.status === 200) {
          setSpiner(false);
          navigate("/user/otp", { state: phoneNumber });
        } else {
          toast.error(response.response.data.error);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
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
          <MainButton type="submit">
            Send Code{" "}
            {spiner ? (
              <span>
                <CircularProgress />
              </span>
            ) : (
              ""
            )}
          </MainButton>
        </form>
      </Box>
      <ToastContainer />
    </MainWrapper>
  );
};

export default MobileNumberVerification;
