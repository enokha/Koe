import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const appState = useSelector(state => state.user);

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
      {/* Additional Route for profile redirection (if needed) */}
      {appState?.isAuthenticated && appState?.user && (
        <Route path="/profile/*" element={<Navigate to="/profile" replace={true} />} />
      )}
    </Routes>
  );
};

export default PrivateRoute;