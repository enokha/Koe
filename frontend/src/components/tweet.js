import React from 'react';
import '../styles/HomePage.css';

const Tweet = ({ tweet }) => {
  const { username, handle, content, timestamp } = tweet;

  return (
    <div className="tweet">
      <div className="tweet__avatar">
        {/* Add avatar image */}
        <img src="path/to/avatar.jpg" alt={`${username}'s avatar`} />
      </div>
      <div className="tweet__content">
        <div className="tweet__header">
          <span className="tweet__username">{username}</span>
          <span className="tweet__handle">@{handle}</span>
          <span className="tweet__timestamp">{timestamp}</span>
        </div>
        <div className="tweet__text">{content}</div>
      </div>
    </div>
  );
};

export default Tweet;
