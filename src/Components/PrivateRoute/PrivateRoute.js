import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Dashboard from "../Dashboard/Dashboard";

const PrivateRoute = ({children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    currentUser ? <Dashboard ></Dashboard> : navigate("/login")
  );
};

export default PrivateRoute;