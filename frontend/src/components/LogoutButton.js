import React from 'react';
import '../styles/HomePage.css';
import axios from '../constants/axios';

const LogoutButton = ({ onClick }) => {
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      onClick();
    } catch (error) {
      console.log('Error during logout:', error.message);
    }
  };

  return (
    <button className="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
