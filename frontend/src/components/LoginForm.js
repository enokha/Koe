import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../constants/axios";
import { requests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";

const LoginForm = () => {
  const { dispatch } = useAppStateContext();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Function to toggle password visibility
  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  // Function to handle authentication
  const authentication = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please fill all required fields");
    } else {
      try {
        // Use instance.post for the request
        const response = await instance.post(requests.login, {
          email: email,
          password: password,
        });

        // Dispatch login action and navigate to home
        dispatch({
          type: "Login",
          payload: {
            token: response.data.token,
            email: email,
            username: response.data.username,
          },
        });
        navigate("/home");
      } catch (error) {
        // Handle errors and update the message state
        console.log(error);
        setMessage(error.response?.data?.message || "An error occurred");
      }
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

      <button className="submit" onClick={authentication}>
        Submit
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
