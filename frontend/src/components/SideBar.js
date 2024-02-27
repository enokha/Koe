import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faSearch, faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/HomePage.css";
import useAppStateContext from '../hooks/useAppStateContext';

const SideBar = () => {
  const { appState } = useAppStateContext();

  console.log('Current User:', appState.user);

  return (
    <div className="sideBar">
      <Link to="/home" className="sidebarOption active">
        <FontAwesomeIcon icon={faHome} />
        <h2>Home</h2>
      </Link>
      <div className="sidebarOption">
        <FontAwesomeIcon icon={faSearch} />
        <h2>Search</h2>
      </div>
      <div className="sidebarOption">
        <FontAwesomeIcon icon={faBell} />
        <h2>Notifications</h2>
      </div>
      <div className="sidebarOption">
        <FontAwesomeIcon icon={faEnvelope} />
        <h2>Messages</h2>
      </div>
      <Link to="/profile" className="sidebarOption">
        <FontAwesomeIcon icon={faUser} />
        <h2>Profile</h2>
      </Link>
    </div>
  );
};

export default SideBar;
