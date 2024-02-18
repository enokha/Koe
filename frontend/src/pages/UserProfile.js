import React, { useState, useEffect } from 'react';
import UserProfileHeader from '../components/UserProfileHeader';
import FollowStats from '../components/FollowStats';
import UserPosts from '../components/UserPosts';
import instance from '../constants/axios';
import { requests } from '../constants/requests';
import '../styles/Profile.css';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await instance.get(requests.getUserProfile + `/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFollow = async () => {
    try {
      await instance.post(requests.followUser + `/${userId}`);
      const response = await instance.get(requests.getUserProfile + `/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error handling follow:', error);
    }
  };

  return (
    <div className="profile-container">
      {userData && (
        <>
          <UserProfileHeader
            username={userData.username}
            handle={userData.handle}
            profileImage={userData.profileImage}
            coverPhoto={userData.coverPhoto}
          />
          <FollowStats
            followersCount={userData.followersCount}
            followingCount={userData.followingCount}
            postsCount={userData.postsCount}
          />
          <UserPosts userPosts={userData.posts} />
          <button onClick={handleFollow}>Follow</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
