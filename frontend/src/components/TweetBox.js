// TweetBox.js
import React from 'react';
import '../styles/HomePage.css';

const TweetBox = () => {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetbox__input">
          <img alt="" src="" />
          {/* Placeholder for the famous account post */}
          <div className="post">
            <div className="post_avatar">
              <div className="post__body">
                <div className="post__header">
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
