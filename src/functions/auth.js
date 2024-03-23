import axios from "axios";

export const register = async (dial_code, mobileNumber) =>
  await axios.post(`https://staging.fastor.in/v1/pwa/user/register`, {
    dial_code,
    mobileNumber,
  });

//login With otp
//https://staging.fastor.in/v1/pwa/user/login

//getApi
//https://staging.fastor.in/v1/m/restaurant?city_id=118
