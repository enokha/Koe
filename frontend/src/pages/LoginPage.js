import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useSelector } from "react-redux"; // Import the useSelector hook from react-redux
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  const appState = useSelector((state) => state.user); // Use useSelector to access state.user

  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0,
  });

  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500,
  });

  const loginButtonProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px white",
  });
  const registerButtonProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px white"
      : "solid 0px transparent",
  });

  const navigate = useNavigate(); // Use useNavigate hook to navigate

  // Use useEffect to set the initial registration form status based on some condition
  useEffect(() => {
    setRegistrationFormStatus(!appState.isAuthenticated);
  }, [appState.isAuthenticated]);

  // Handle successful login and navigate to home page
  const handleSuccessfulLogin = () => {
    console.log("Login successful!"); // You can customize this message
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="nav-buttons">
          <animated.button
            id="loginButton"
            onClick={() => setRegistrationFormStatus(false)}
            style={loginButtonProps}
          >
            Login
          </animated.button>
          <animated.button
            id="registerButton"
            onClick={() => setRegistrationFormStatus(true)}
            style={registerButtonProps}
          >
            Register
          </animated.button>
        </div>
        <div className="form-group">
          <animated.form action="" id="loginform" style={loginProps}>
            {/* Pass handleSuccessfulLogin to LoginForm */}
            <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
          </animated.form>
          <animated.form action="" id="registerform" style={registerProps}>
            <RegisterForm />
          </animated.form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
