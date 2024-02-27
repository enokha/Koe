import React from 'react';

const UserProfileHeader = ({ username, handle, profileImage, coverPhoto }) => {
  return (
    <div className="profile-header">
      <img src={coverPhoto} alt="" className="cover-photo" />
      <img src={profileImage} alt="" className="profile-image" />
      <h2>{username}</h2>
      <p>{`@${handle}`}</p>
    </div>
  );
};

export default UserProfileHeader;
