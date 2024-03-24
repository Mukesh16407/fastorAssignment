/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
  if (localStorage.getItem("userdbtoken")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};
