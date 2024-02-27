import React from 'react';
import '../styles/HomePage.css';

const Tweet = ({ displayName, username, text, avatar, comments }) => {
  return (
    <div className="tweet">
      <div className="tweet__body">
        <div className="tweet__header">
          <img src={avatar} alt={displayName} className="tweet__avatar" />
          <div className="tweet__headerText">
            <h3>{displayName} @{username}</h3>
          </div>
        </div>

        <div className="tweet__text">
          <p>{text}</p>
        </div>

        <div className="tweet__comments">
          <h4>Comments:</h4>
          {comments.map((comment) => (
            <div key={comment._id} className="tweet__comment">
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
