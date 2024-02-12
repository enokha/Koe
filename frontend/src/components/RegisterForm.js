import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  return (
    <React.Fragment>
      <div className="inputs-container">
        <div className="input-container">
          <label className="email">Email</label>
          <input type="text" className="email" />
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="username">Username</label>
          <input type="text" className="username" />
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="password">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="password"
          />
          <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
            <span>
              {showPass ? (
                <FontAwesomeIcon
                  icon={faEye}
                  style={{
                    position: "absolute",
                    left: "auto",
                    right: "10px",
                    textIndent: "32px",
                    top: "100px",
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{
                    position: "absolute",
                    left: "auto",
                    right: "10px",
                    textIndent: "32px",
                    top: "100px",
                  }}
                />
              )}
            </span>
          </span>
        </div>
      </div>
      <button className="submit">Submit</button>
    </React.Fragment>
  );
};

export default RegisterForm;
