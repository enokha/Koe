import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profile.css";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="profile-picture"
        />
        <div className="user-info">
          <h2 className="username">John Doe</h2>
          <p className="handle">@johndoe</p>
          <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="additional-info">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="location">New York, NY</span>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="joined-date">Joined September 2023</span>
          </div>
        </div>
      </div>
      <div className="follow-stats">
        <div>
          <span className="count">100</span>
          <span className="label">Followers</span>
        </div>
        <div>
          <span className="count">200</span>
          <span className="label">Following</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;