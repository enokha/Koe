import React from 'react';
import "../styles/HomePage.css";
import { faHome, faSearch, faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  return (
    <div className="sideBar">
      <i className="icon-twitter"> K</i>

      {/* Sidebar Options */}
      <div className="sidebarOption active">
        <FontAwesomeIcon icon={faHome} />
        <h2>Home</h2>
      </div>
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

      {/* ... (Other sidebar options) */}
      
      <button className="sidebar__tweet">Tweet</button>
    </div>
  );
};

export default Sidebar;
