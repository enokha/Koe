import React from 'react';
import '../styles/HomePage.css';
import { Routes, Route } from 'react-router-dom';
import TweetBox from '../components/TweetBox';
import Tweet from '../components/tweet';
import Post from '../components/Post';

const Feed = ({ username }) => {
  const handleNewTweet = (tweetContent) => {

    console.log(`New tweet from ${username}: ${tweetContent}`);
  };

  const sampleTweet = {
    username: 'John Doe',
    handle: 'john_doe123',
    content: 'This is a sample tweet!',
    timestamp: '2 hours ago',
  };

  return (
    <div className="feed">
      <Routes>
        <Route
          path="/"
          element={<TweetBox onTweet={handleNewTweet} />}
        />
        <Route path="/tweets" element={<Tweet tweet={sampleTweet} />} />
        {/* ... (Other routes) */}
      </Routes>

      {/* Include the Post component and pass the username */}
      <Post username={username} />
    </div>
  );
};

export default Feed;
