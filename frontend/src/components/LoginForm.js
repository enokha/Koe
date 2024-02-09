import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  return (
    <React.Fragment>
      <label className="email">Email</label>
      <input type="text" className="email" />
      <label className="password">Password</label>
      <input
        type={showPass ? "text" : "password"}
        className="password"
      />
      <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
        <span>
          {showPass ? (
            <FontAwesomeIcon icon={faEye} className="customIcon" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
          )}
        </span>
      </span>
      <button className="submit">Submit</button>
    </React.Fragment>
  );
};

export default LoginForm;
