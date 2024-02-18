import React from "react";

const FollowButton = ({ isFollowing, onFollow }) => {
  return (
    <button onClick={onFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
