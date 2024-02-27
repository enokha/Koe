import React, { useState, useContext } from 'react';
import '../styles/HomePage.css';
import { AppStateContext } from '../context/AppStateProvider';
import useApi from '../hooks/useApi';

const TweetBox = () => {
  const { appState } = useContext(AppStateContext);
  const [tweet, setTweet] = useState('');
  const [comment, setComment] = useState('');
  const { data: userData } = useApi(`http://localhost:3000/user/${appState.user?.id}`);

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    if (!appState.isAuthenticated) {
      console.error('User not authenticated. Please log in.');
      return;
    }

    // Post the tweet with comments to the backend
    const response = await fetch('http://localhost:3000/api/tweets/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appState.user.token}`,
      },
      body: JSON.stringify({
        userId: appState.user.id,
        content: tweet,
        comments: [{ userId: appState.user.id, content: comment }],
      }),
    });

    if (response.ok) {
      // Clear the tweet box after posting
      setTweet('');
      setComment('');
      // You may want to fetch the updated feed after posting (useApi or another fetch)
    } else {
      console.error('Error posting tweet:', response.statusText);
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweetSubmit}>
        <div className="tweetbox__input">
          <textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="sidebar__tweet" type="submit">Tweet</button>
        </div>
      </form>

      {/* Optionally, you can display the user's profile info */}
      <div className="userProfileInfo">
        <img src={userData.avatar} alt={userData.displayName} />
        <p>{userData.displayName} @{userData.username}</p>
      </div>
    </div>
  );
};

export default TweetBox;
