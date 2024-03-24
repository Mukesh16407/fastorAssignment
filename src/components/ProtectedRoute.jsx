/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userdbtoken");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        "https://staging.fastor.in/v1/m/restaurant",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Token is expired or invalid, navigate to login
          throw new Error("Unauthorized");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setUser(data);
      } else {
        localStorage.clear();
        navigate("/login");
      }
      console.log(data, "data");

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, [user]);

  if (localStorage.getItem("userdbtoken")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
