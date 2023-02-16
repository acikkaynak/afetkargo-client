import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import React, { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("_ygu");
  if (user?.token?.accessToken?.length == 0 && jwt) {
    dispatch(setUser(JSON.parse(jwt)));
  }
  return jwt ? children : <Navigate to="/" />;
};

export default PrivateRoute;
