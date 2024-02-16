import React from 'react';
import '../styles/HomePage.css';

const TweetBox = () => {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetbox__input">
          <img src="" alt="User Avatar" />
          <input type="text" placeholder="Say Something!" />
        </div>
        <button className="tweetBox__tweetButton">Tweet</button>
      </form>
    </div>
  );
};

export default TweetBox;
