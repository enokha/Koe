import React from 'react';
import '../styles/HomePage.css';
import { Routes, Route } from 'react-router-dom';
import TweetBox from '../components/TweetBox';
import Tweet from '../components/tweet';

const Feed = () => {
  const sampleTweet = {
    username: 'John Doe',
    handle: 'john_doe123',
    content: 'This is a sample tweet!',
    timestamp: '2 hours ago',
  };

  return (
    <div className="feed">
      <Routes>
        <Route path="/" element={<TweetBox />} />
        <Route path="/tweets" element={<Tweet tweet={sampleTweet} />} />
        {/* ... (Other routes) */}
      </Routes>
    </div>
  );
};

export default Feed;
