import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const appState = useSelector(state => state.user);

  return !appState?.isAuthenticated && !appState?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/home" replace={true} />
  );
};

export default PublicRoute;
