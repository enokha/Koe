import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import instance from "../constants/axios";
import { requests } from "../constants/requests";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.email || !user.password || !user.username) {
      setMessage("Please fill all required fields");
    } else {
      try {
        const response = await instance.post(requests.signup, user);

        dispatch(login({
          token: response.data.token,
          email: user.email,
          username: user.username,
        }));

        setMessage("");
        setRegisterSuccess(true);

        navigate("/login");
      } catch (error) {
        console.error("Registration Error:", error);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="inputs-container">
        <div className="input-container">
          <label id="firstname">username</label>
          <input
            type="text"
            value={user.username}
            className="firstname"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="email">Email</label>
          <input
            type="text"
            className="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="password">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span
            onClick={(e) => togglePassword(e)}
            style={{ cursor: "pointer" }}
          >
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
      <button className="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {message}
      </span>

      {registerSuccess && <Navigate to="/login" replace={true} />}
    </>
  );
};

export default RegisterForm;
