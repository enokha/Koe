import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import instance from "../constants/axios";
import { requests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { dispatch } = useAppStateContext();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    country: "",
    city: "",
    street: "",
  });

  const togglePassword = (event) => {
    event.preventDefault();

    setShowPass(!showPass);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !user.email ||
      !user.password ||
      !user.username ||
      !user.country ||
      !user.city ||
      !user.street
    ) {
      setMessage("Please fill all required fields");
    } else {
      instance
        .post(requests.signup, user)
        .then((response) => {
          console.log(response);
          dispatch({
            type: "Login",
            payload: {
              token: response.data.token,
              email: user.email,
              username: user.username,
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
                    textindent: "32px",
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
                    textindent: "32px",
                    top: "100px",
                  }}
                />
              )}
            </span>
          </span>
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="country">Country</label>
          <input
            type="text"
            className="country"
            value={user.country}
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="street">Street</label>
          <input
            type="text"
            className="street"
            value={user.street}
            onChange={(e) => setUser({ ...user, street: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="city">City</label>
          <input
            type="text"
            className="city"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </div>
      </div>
      <button className="submit" onClick={(e) => handleSubmit(e)}>
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

export default RegisterForm;
