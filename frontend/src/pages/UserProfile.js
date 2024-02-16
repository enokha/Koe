import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profile.css";

const UserProfile = () => {
  // State to hold user profile data
  const [userData, setUserData] = useState(null);

  // Fetch user profile data from the backend API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('your-backend-user-profile-endpoint', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.log('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('Error during user profile data fetch:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Render user profile based on fetched data
  return (
    <div className="profile-container">
      {/* User Profile Header */}
      {userData && (
        <div className="profile-header">
          <img
            src={userData.profilePicture}
            alt={userData.username}
            className="profile-picture"
          />
          <div className="user-info">
            <h2 className="username">{userData.username}</h2>
            <p className="handle">@{userData.handle}</p>
            <p className="bio">{userData.bio}</p>
            <div className="additional-info">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="location">{userData.location}</span>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="joined-date">{`Joined ${userData.joinedDate}`}</span>
            </div>
          </div>
        </div>
      )}

      {/* Follow Stats */}
      <div className="follow-stats">
        <div>
          <span className="count">{userData.followersCount}</span>
          <span className="label">Followers</span>
        </div>
        <div>
          <span className="count">{userData.followingCount}</span>
          <span className="label">Following</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
