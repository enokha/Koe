import React from 'react';
import '../styles/HomePage.css';
import TweetBox from './TweetBox';
import Post from './Post';

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {/* Repeat this structure for other posts */}
      <Post
        username="Nature"
        handle="@TheEarthsNature"
        description="Let go man!"
        // Add other post content properties
      />
      {/* ... (Other posts) */}
    </div>
  );
};

export default Feed;
