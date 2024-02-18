// SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faSearch, faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/HomePage.css";

const SideBar = () => {
  return (
    <div className="sideBar">
      <i className="icon-twitter"> K</i>

      {/* Sidebar Options */}
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

      {/* User Profile Link */}
      <Link to="/profile" className="sidebarOption">
        <FontAwesomeIcon icon={faUser} />
        <h2>Profile</h2>
      </Link>

      {/* ... (Other sidebar options) */}
      
      <button className="sidebar__tweet">Tweet</button>
    </div>
  );
};

export default SideBar;
