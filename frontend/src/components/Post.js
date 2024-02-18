import React from 'react';
import "../styles/HomePage.css";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* Textbox */}
      <div className="tweetBox">
        <form>
          <div className="tweetbox__input">
            <img src="" alt="User Avatar" />
            <input type="text" placeholder="Say Something!" />
          </div>
          <button className="tweetBox__tweetButton">Tweet</button>
        </form>
      </div>

      {/* Post */}
      <div className="post">
        <div className="post_avatar">
          {/* Post Body */}
          <div className="post__body">
            <div className="post__header">
              {/* Post Header */}
              <div className="post__headerText">
                <h3>
                  Nature
                  <span className="post_headerSpecial">
                    <span className="post__bandge"></span>@TheEarthsNature
                  </span>
                </h3>
              </div>
              <div className="post_headDescription">
                <p>Let go man!</p>
              </div>
            </div>
            <img src="" alt="" />
          </div>
          {/* Post Footer */}
          <div className="post__footer">
            <span className="material-symbols-outlined"> repeat </span>
            <span className="material-symbols-outlined"> favorite </span>
            <span className="material-symbols-outlined"> publish </span>
          </div>
        </div>
      </div>

      {/* Placeholder for other posts */}
      {[1, 2, 3].map(postId => (
        <div key={postId} className="post">
          {/* Placeholder for other posts */}
        </div>
      ))}
    </div>
  );
};

export default Feed;
