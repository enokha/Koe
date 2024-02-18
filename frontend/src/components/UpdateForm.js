import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import instance from "../constants/axios";
import { requests } from "../constants/requests";
import useAppStateContext from "../hooks/useAppStateContext";

const UpdateForm = () => {
  const { dispatch, state } = useAppStateContext();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    // Fetch user details when component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await instance.get(requests.getUser);
        const userDetails = response.data;
        setPhoneNumber(userDetails.phone_number || "");
        setBirthdate(userDetails.birthdate || "");
        setLanguage(userDetails.language || "");
        setCountry(userDetails.country || "");
        setGender(userDetails.gender || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to toggle password visibility
  const togglePassword = () => {
    setShowPass(!showPass);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.put(requests.updateProfile, {
        password,
        phone_number: phoneNumber,
        birthdate,
        language,
        country,
        gender,
      });
      setMessage(response.data.message);

      // Dispatch action to update user context with new details
      dispatch({
        type: "UpdateUser",
        payload: {
          phone_number: phoneNumber,
          birthdate,
          language,
          country,
          gender,
        },
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Password</label>
      <div className="password-field">
        <input
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPass ? faEye : faEyeSlash}
          onClick={togglePassword}
          className="password-toggle"
        />
      </div>

      <label>Phone Number</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <label>Birthdate</label>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />

      <label>Language</label>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <label>Country</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <label>Gender</label>
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <button type="submit">Submit</button>

      {message && <span>{message}</span>}
    </form>
  );
};

export default UpdateForm;