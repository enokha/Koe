import React from "react";
import UpdateForm from "../components/UpdateForm";
import "../styles/Login.css";

const SettingPage = () => {
  return (
    <div className="settingPage">
      <h2>Account Settings</h2>
      <UpdateForm />
    </div>
  );
};

export default SettingPage;