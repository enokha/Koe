import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import instance from "../constants/axios";
import { requests } from "../constants/requests";
import { login } from '../redux/actions/userActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const authentication = async () => {
    try {
      const response = await instance.post(requests.login, {
        email,
        password,
      });

      const { token, user } = response.data;

      dispatch(login(token, user.email, user.username));

      setMessage("");
      // Navigate to the home page upon successful login
      navigate("/home");
    } catch (error) {
      console.log("Authentication Error:", error);
      setMessage("User not found");
    }
  };

  return (
    <>
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

      <button className="submit" onClick={authentication}>
        Submit
      </button>

      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {message}
      </span>
    </>
  );
};

export default LoginForm;
