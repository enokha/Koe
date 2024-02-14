import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../constants/axios";
import { requests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";

const LoginForm = () => {
  const { dispatch } = useAppStateContext();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();

    setShowPass(!showPass);
  };

  const authentication = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please fill all required fields");
    } else {
      axios
        .post(requests.login, {
          email: email,
          password: password,
        })
        .then((response) => {
          dispatch({
            type: "Login",
            payload: {
              token: response.data.token,
              email: email,
              username: response.data.username,
            },
          });
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          setMessage(error.response.data.message);
        });
    }
  };

  return (
    <React.Fragment>
      <label className="email">Email</label>
      <input
        type="text"
        className="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="password">Password</label>
      <input
        type={showPass ? "text" : "password"}
        className="password"
        onChange={(e) => setPassword(e.target.value)}
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
      <button className="submit" onClick={(e) => authentication(e)}>
        submit
      </button>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {message}
      </span>
    </React.Fragment>
  );
};

export default LoginForm;
