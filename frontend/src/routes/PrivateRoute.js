import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAppStateContext from "../hooks/useAppStateContext";

const PrivateRoute = ({ element }) => {
  const { appState } = useAppStateContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          appState?.isAuthenticated && appState?.user ? (
            element
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
