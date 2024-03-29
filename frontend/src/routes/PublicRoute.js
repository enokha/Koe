import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAppStateContext from "../hooks/useAppStateContext";

const PublicRoute = () => {
  const { appState } = useAppStateContext();

  return !appState?.isAuthenticated && !appState?.user ? (
    <Outlet />
  ) : (
    <><Navigate to="/home" replace={true} />
    <Navigate to="/profile" replace={true} /></>
  );
};

export default PublicRoute;