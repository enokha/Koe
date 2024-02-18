import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [logoutState, setLogoutState] = useState(false);

  function onLogout() {
    localStorage.removeItem("loginState");
    setLogoutState(true);
  }

  return logoutState ? (
    <Navigate to="/" />
  ) : (
    <button
      className="text-white text-lg self-end mr-10 mt-5 p-3 rounded-lg border border-white"
      onClick={onLogout}
    >
      Log Out
    </button>
  );
}
