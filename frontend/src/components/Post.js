import React, { useState } from 'react';
import axios from 'axios';
import "../styles/HomePage.css";

const Feed = ({ username }) => {
  const [newTweet, setNewTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    if (newTweet.trim() !== '') {
      try {
        const tweet = {
          id: new Date().getTime(),
          content: newTweet,
          username: username,
          likesCount: 0,
          retweetsCount: 0,
          createdAt: new Date().toISOString()
        };

        // Update the state with the new tweet
        setTweets((prevTweets) => [tweet, ...prevTweets]);

        // Clear the newTweet state for the next tweet
        setNewTweet('');

        // Send the new tweet to the server for storage
        await axios.post('/api/tweets', tweet); // Replace with the actual endpoint
      } catch (error) {
        console.error('Error submitting tweet:', error.message);
      }
    }
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* Textbox */}
      <div className="tweetBox">
        <form>
          <div className="tweetbox__input">
            {/* Display user avatar (replace src with actual user avatar URL) */}
            <img src="" alt="User Avatar" />
            <input
              type="text"
              placeholder="What's happening?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
            />
          </div>
          <button className="tweetBox__tweetButton" onClick={handleTweetSubmit}>
            Tweet
          </button>
        </form>
      </div>

      {/* Display tweets */}
      {tweets.map((tweet) => (
        <div key={tweet.id} className="post">
          <div className="post_avatar">
            {/* Display user avatar (replace src with actual user avatar URL) */}
            <img src="" alt="User Avatar" />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {tweet.username}
                  <span className="post_headerSpecial">
                    {/* Additional tweet header info */}
                  </span>
                </h3>
              </div>
              <div className="post_headDescription">
                <p>{tweet.content}</p>
              </div>
            </div>
            <img src="" alt="Tweet Content" />
            {/* Additional post body content */}
          </div>
          <div className="post__footer">
            <span className="material-symbols-outlined"> repeat {tweet.retweetsCount} </span>
            <span className="material-symbols-outlined"> favorite {tweet.likesCount} </span>
            <span className="material-symbols-outlined"> publish {tweet.createdAt} </span>
          </div>
          {/* Additional post footer content */}
        </div>
      ))}
    </div>
  );
};

export default Feed;
