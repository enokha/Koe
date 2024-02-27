import React from 'react';

const FollowStats = ({ followersCount, followingCount, postsCount }) => {
  return (
    <div className="follow-stats">
      <div>
        <strong>{followersCount}</strong> Followers
      </div>
      <div>
        <strong>{followingCount}</strong> Following
      </div>
      <div>
        <strong>{postsCount}</strong> Posts
      </div>
    </div>
  );
};

export default FollowStats;
